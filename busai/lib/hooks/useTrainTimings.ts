import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrainDataSource } from "../train/dataSource";
import type { TrainLineCode } from "../train/types";

export function useTrainTimings(
  stationId: string | null,
  line: TrainLineCode | null,
  direction: "0" | "1",
  refreshToken = 0,
) {
  const query = useQuery({
    queryKey: ["trainTimings", stationId, line, direction],
    queryFn: () => {
      if (!stationId || !line) throw new Error("Station and line required");
      return getTrainDataSource().getTimings(stationId, line, direction);
    },
    enabled: Boolean(stationId && line),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (refreshToken > 0) void query.refetch();
    // Only the explicit refresh token should trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  return query;
}
