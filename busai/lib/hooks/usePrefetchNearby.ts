import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSupabase } from "../supabaseClient";
import { getServicesAtStop } from "../api/ltaBusRoutes";
import type { BusStop, RouteStop } from "../types";
import type { BothDirectionsFull } from "../api/ltaBusRoutes";
import { logPayloadLocal, utf8JsonBytes } from "../payloadLog";

interface CompactStop {
  code: string;
  name: string;
}

function compactToRouteStops(stops: CompactStop[]): RouteStop[] {
  return stops.map((s, i) => ({
    stopCode: s.code,
    stopName: s.name,
    roadName: "",
    sequence: i + 1,
    distance: i * 0.5,
  }));
}

const STALE_TIME = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Eagerly prefetches services and full route data for all nearby stops.
 * Only re-fetches when the set of stop codes actually changes (not just distances).
 * Uses a single batch Supabase query for all routes to minimise round-trips.
 */
export function usePrefetchNearby(stops: BusStop[]) {
  const queryClient = useQueryClient();
  const lastCodesKeyRef = useRef<string>("");

  useEffect(() => {
    if (!stops.length) return;

    const codesKey = [...stops.map((s) => s.BusStopCode)].sort().join(",");
    if (codesKey === lastCodesKeyRef.current) return;
    lastCodesKeyRef.current = codesKey;

    void (async () => {
      try {
        // Step 1: Fetch services for every nearby stop in parallel (each hits GIN index — fast)
        const servicesPerStop = await Promise.all(
          stops.map((stop) =>
            queryClient
              .fetchQuery({
                queryKey: ["servicesAtStop", stop.BusStopCode],
                queryFn: () => getServicesAtStop(stop.BusStopCode),
                staleTime: STALE_TIME,
              })
              .catch(() => [])
          )
        );

        logPayloadLocal("usePrefetchNearby.servicesAtStop", {
          stopCount: stops.length,
          servicesListsJsonUtf8Bytes: utf8JsonBytes(servicesPerStop),
          totalServiceRows: servicesPerStop.reduce((n, arr) => n + arr.length, 0),
        });

        // Step 2: Collect unique service numbers across all stops
        const allServiceNos = [
          ...new Set(servicesPerStop.flat().map((s) => s.ServiceNo)),
        ];
        if (!allServiceNos.length) return;

        const client = getSupabase();
        if (!client) return;

        // Step 3: ONE batch Supabase query for all routes at once
        const { data: compactRows } = await client
          .from("bus_routes_compact")
          .select("service_no, direction, stops")
          .in("service_no", allServiceNos);

        if (!compactRows?.length) return;

        logPayloadLocal("usePrefetchNearby.bus_routes_compact", {
          uniqueServiceNos: allServiceNos.length,
          compactRowCount: compactRows.length,
          compactRowsJsonUtf8Bytes: utf8JsonBytes(compactRows),
        });

        // Group rows by service number
        const byService = new Map<
          string,
          { raw1: CompactStop[]; raw2: CompactStop[] }
        >();
        for (const row of compactRows) {
          if (!byService.has(row.service_no)) {
            byService.set(row.service_no, { raw1: [], raw2: [] });
          }
          const entry = byService.get(row.service_no)!;
          if (row.direction === 1) entry.raw1 = row.stops;
          else if (row.direction === 2) entry.raw2 = row.stops;
        }

        // Step 4: Populate ["routeBothDirs", serviceNo, stopCode] for each stop+service pair
        stops.forEach((stop, i) => {
          const services = servicesPerStop[i];
          services.forEach((service) => {
            const entry = byService.get(service.ServiceNo);
            if (!entry) return;

            const raw1 = compactToRouteStops(entry.raw1);
            const raw2 = compactToRouteStops(entry.raw2);

            const userInDir2 = raw2.some((s) => s.stopCode === stop.BusStopCode);
            const dir1 = userInDir2 ? raw2 : raw1;
            const dir2 = userInDir2 ? raw1 : raw2;

            const result: BothDirectionsFull = {
              dir1,
              dir2,
              dir1Terminal: dir1.at(-1)?.stopName ?? "Terminal",
              dir2Terminal: dir2.at(-1)?.stopName ?? "Terminal",
            };

            queryClient.setQueryData(
              ["routeBothDirs", service.ServiceNo, stop.BusStopCode],
              result
            );
          });
        });
      } catch {
        // Prefetch is best-effort; never crash the app
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops.map((s) => s.BusStopCode).sort().join(",")]);
}
