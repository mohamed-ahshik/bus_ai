import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import GoogleMap from "../../components/GoogleMap";
import { useTripPlan } from "../../lib/hooks/useTripPlan";
import type { RouteOption, TransitStep } from "../../lib/api/googleTrip";

// Renders text with **bold** markdown inline, no external library needed
function BoldText({
  text,
  style,
}: {
  text: string;
  style?: object | object[];
}) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <Text style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={{ fontWeight: "700" }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
}

const PRIMARY = "#2e7d32";
const MUTED_FG = "#757575";
const BORDER = "#eeeeee";
const WHITE = "#ffffff";
const FG = "#1a1a1a";
const MUTED_BG = "#f5f5f5";
const BLUE = "#1a73e8";

const { height: SCREEN_H } = Dimensions.get("window");

const DEFAULT_REGION = {
  latitude: 1.3521,
  longitude: 103.8198,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const WALK_COLOR = "#9e9e9e";
const BUS_COLOR = "#22c55e";
const DIMMED_COLOR = "#b0bec5";

// Determines white vs dark text on a colored badge
function isColorDark(hex: string): boolean {
  const h = hex.replace("#", "");
  if (h.length < 6) return true;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
}

// Build colored polylines from a route's steps
function buildStepPolylines(route: RouteOption, opacity: "full" | "dimmed") {
  if (opacity === "dimmed") {
    return route.polylineCoords.length > 0
      ? [{ coordinates: route.polylineCoords, strokeColor: DIMMED_COLOR, strokeWidth: 2 }]
      : [];
  }
  return route.steps
    .filter((s) => s.stepPolyline && s.stepPolyline.length > 1)
    .map((s) => {
      const isWalking = s.travelMode === "WALKING";
      const color = isWalking
        ? WALK_COLOR
        : s.transitDetails?.lineColor ?? BUS_COLOR;
      return {
        coordinates: s.stepPolyline,
        strokeColor: color,
        strokeWidth: isWalking ? 2 : 5,
        lineDashPattern: isWalking ? [6, 6] : undefined,
      };
    });
}

// ── Transit line chips row ──────────────────────────────────────────────────
function RouteChips({ steps }: { steps: TransitStep[] }) {
  const relevant = steps.filter(
    (s) => s.travelMode === "WALKING" || s.travelMode === "TRANSIT"
  );
  return (
    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 3 }}>
      {relevant.map((step, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <Iconify icon="solar:alt-arrow-right-linear" size={9} color="#bdbdbd" />
          )}
          {step.travelMode === "WALKING" ? (
            <Iconify icon="solar:walking-bold" size={14} color="#9e9e9e" />
          ) : step.transitDetails ? (
            <View
              style={{
                backgroundColor: step.transitDetails.lineColor,
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: isColorDark(step.transitDetails.lineColor) ? WHITE : FG,
                  fontWeight: "700",
                  fontSize: 10,
                  letterSpacing: 0.3,
                }}
              >
                {step.transitDetails.lineName}
              </Text>
            </View>
          ) : null}
        </React.Fragment>
      ))}
    </View>
  );
}

// ── Step-by-step timeline ────────────────────────────────────────────────────
function RouteStepTimeline({
  route,
  destinationLabel,
  originName,
}: {
  route: RouteOption;
  destinationLabel: string;
  originName: string;
}) {
  type TimelineRow =
    | { kind: "stop"; time: string; name: string; isFirst: boolean; isLast: boolean }
    | { kind: "walk"; duration: string; distance: string }
    | { kind: "transit"; lineName: string; lineColor: string; vehicleType: string; toStop: string; numStops: number; duration: string };

  const rows: TimelineRow[] = [];
  let firstStopAdded = false;

  const startsWithWalk = route.steps[0]?.travelMode === "WALKING";

  // If the route begins with a walk, show the actual origin (user's bus stop)
  // before the walk row so the user knows where they start walking from.
  if (startsWithWalk) {
    rows.push({
      kind: "stop",
      time: route.departureTimeText,
      name: originName || route.firstBoardingStop || "Boarding stop",
      isFirst: true,
      isLast: false,
    });
    firstStopAdded = true;
  }

  route.steps.forEach((step, idx) => {
    if (step.travelMode === "WALKING") {
      rows.push({
        kind: "walk",
        duration: step.durationText,
        distance: step.distanceText,
      });
    } else if (step.travelMode === "TRANSIT" && step.transitDetails) {
      const td = step.transitDetails;

      // Add the boarding stop. Mark isFirst only if nothing has been added yet
      // (i.e. route starts directly with transit, no preceding walk).
      rows.push({
        kind: "stop",
        time: td.departureTimeText,
        name: td.departureStop,
        isFirst: !firstStopAdded,
        isLast: false,
      });
      firstStopAdded = true;

      rows.push({
        kind: "transit",
        lineName: td.lineName,
        lineColor: td.lineColor,
        vehicleType: td.vehicleType,
        toStop: td.arrivalStop,
        numStops: td.numStops,
        duration: step.durationText,
      });

      // After alighting, show the arrival stop as a dot when the next step is a
      // walk (so the user sees where they get off before walking).
      const nextStep = route.steps[idx + 1];
      if (nextStep?.travelMode === "WALKING" && td.arrivalStop && td.arrivalStop !== destinationLabel) {
        rows.push({
          kind: "stop",
          time: "",
          name: td.arrivalStop,
          isFirst: false,
          isLast: false,
        });
      }
    }
  });

  // Final destination stop
  rows.push({
    kind: "stop",
    time: route.arrivalTimeText,
    name: destinationLabel,
    isFirst: false,
    isLast: true,
  });

  const LINE_W = 2;
  const DOT_SIZE = 12;
  const LEFT_COL = 56; // width for time column

  return (
    <View style={{ paddingTop: 8, paddingBottom: 4 }}>
      {rows.map((row, idx) => {
        if (row.kind === "stop") {
          return (
            <View key={idx} style={{ flexDirection: "row", alignItems: "flex-start" }}>
              {/* Time column */}
              <Text
                style={{
                  width: LEFT_COL,
                  fontSize: 11,
                  fontWeight: "700",
                  color: row.time ? FG : "transparent",
                  paddingTop: 1,
                  textAlign: "right",
                  paddingRight: 12,
                }}
              >
                {row.time}
              </Text>
              {/* Dot */}
              <View style={{ alignItems: "center", width: DOT_SIZE + 8 }}>
                <View
                  style={{
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    borderRadius: DOT_SIZE / 2,
                    borderWidth: 2,
                    borderColor: row.isLast ? FG : PRIMARY,
                    backgroundColor: row.isLast ? FG : WHITE,
                  }}
                />
              </View>
              {/* Stop name */}
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: row.isFirst || row.isLast ? "700" : "600",
                  color: FG,
                  paddingLeft: 6,
                  paddingBottom: row.isLast ? 0 : 2,
                }}
              >
                {row.name}
              </Text>
            </View>
          );
        }

        if (row.kind === "walk") {
          return (
            <View key={idx} style={{ flexDirection: "row", alignItems: "stretch" }}>
              {/* Empty time col */}
              <View style={{ width: LEFT_COL }} />
              {/* Dotted vertical line */}
              <View style={{ width: DOT_SIZE + 8, alignItems: "center" }}>
                <View
                  style={{
                    width: LINE_W,
                    flex: 1,
                    borderStyle: "dashed",
                    borderLeftWidth: LINE_W,
                    borderColor: "#90caf9",
                    minHeight: 36,
                  }}
                />
              </View>
              {/* Walk info */}
              <View
                style={{
                  flex: 1,
                  paddingLeft: 10,
                  paddingVertical: 6,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Iconify icon="solar:walking-bold" size={16} color={MUTED_FG} />
                <View>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: FG }}>Walk</Text>
                  <Text style={{ fontSize: 11, color: MUTED_FG }}>
                    {row.duration}{row.distance ? `  ·  ${row.distance}` : ""}
                  </Text>
                </View>
              </View>
            </View>
          );
        }

        if (row.kind === "transit") {
          const isBus = row.vehicleType === "BUS";
          const transitIcon = isBus ? "solar:bus-bold" : "solar:tram-bold";
          return (
            <View key={idx} style={{ flexDirection: "row", alignItems: "stretch" }}>
              {/* Empty time col */}
              <View style={{ width: LEFT_COL }} />
              {/* Solid colored vertical line */}
              <View style={{ width: DOT_SIZE + 8, alignItems: "center" }}>
                <View
                  style={{
                    width: 4,
                    flex: 1,
                    backgroundColor: row.lineColor,
                    minHeight: 48,
                    borderRadius: 2,
                  }}
                />
              </View>
              {/* Transit info */}
              <View
                style={{
                  flex: 1,
                  paddingLeft: 10,
                  paddingVertical: 8,
                  gap: 4,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Iconify icon={transitIcon} size={16} color={row.lineColor} />
                  <View
                    style={{
                      backgroundColor: row.lineColor,
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: isColorDark(row.lineColor) ? WHITE : FG,
                        fontWeight: "700",
                        fontSize: 11,
                      }}
                    >
                      {row.lineName}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: FG }}>
                    {isBus ? "Bus" : "MRT"} to {row.toStop}
                  </Text>
                </View>
                <Text style={{ fontSize: 11, color: MUTED_FG, paddingLeft: 24 }}>
                  {row.duration}  ·  {row.numStops} stop{row.numStops !== 1 ? "s" : ""}
                </Text>
              </View>
            </View>
          );
        }

        return null;
      })}
    </View>
  );
}

// ── Single route card ───────────────────────────────────────────────────────
function RouteCard({
  route,
  isSelected,
  recommendation,
  destinationLabel,
  originName,
  onPress,
}: {
  route: RouteOption;
  isSelected: boolean;
  recommendation?: string;   // per-route rec, already indexed by parent
  destinationLabel: string;
  originName: string;
  onPress: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const firstTransitStep = route.steps.find((s) => s.transitDetails);
  const boardingTime =
    firstTransitStep?.transitDetails?.departureTimeText || route.departureTimeText;
  const boardingStop = route.firstBoardingStop;
  const transitDuration = firstTransitStep?.durationText ?? "";

  const hasSubway = route.steps.some(
    (s) => s.transitDetails?.vehicleType === "SUBWAY" || s.transitDetails?.vehicleType === "HEAVY_RAIL"
  );
  const leadIcon = hasSubway ? "solar:tram-bold" : "solar:bus-bold";

  const timeLabel =
    route.departureTimeText && route.arrivalTimeText
      ? `${route.departureTimeText} — ${route.arrivalTimeText}`
      : route.durationText;

  return (
    <View
      style={{
        borderRadius: 16,
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? PRIMARY : BORDER,
        backgroundColor: isSelected ? "#f0fdf4" : WHITE,
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          padding: 14,
          gap: 10,
          backgroundColor: pressed && !isSelected ? "#fafafa" : "transparent",
        })}
      >
        {/* Row 1: icon + time range + duration */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: isSelected ? PRIMARY : MUTED_BG,
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Iconify icon={leadIcon} size={18} color={isSelected ? WHITE : MUTED_FG} />
          </View>
          <Text style={{ flex: 1, fontWeight: "700", fontSize: 14, color: FG }}>
            {timeLabel}
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 14,
              color: isSelected ? PRIMARY : FG,
              flexShrink: 0,
            }}
          >
            {route.durationText}
          </Text>
        </View>

        {/* Row 2: transit chips */}
        <RouteChips steps={route.steps} />

        {/* Row 3: boarding info */}
        {(boardingTime || boardingStop) ? (
          <Text style={{ fontSize: 11, color: MUTED_FG }}>
            {boardingTime ? `${boardingTime} from ` : ""}
            {boardingStop ? (
              <Text style={{ fontWeight: "600", color: "#424242" }}>{boardingStop}</Text>
            ) : null}
            {transitDuration ? `  ·  ${transitDuration}` : ""}
          </Text>
        ) : null}

        {/* AI recommendation (selected card only) */}
        {isSelected && recommendation ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 8,
              backgroundColor: `${PRIMARY}12`,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Iconify icon="solar:magic-stick-3-bold" size={14} color={PRIMARY} />
            <BoldText
              text={recommendation}
              style={{ flex: 1, fontSize: 11, color: "#2e7d32", lineHeight: 16 }}
            />
          </View>
        ) : null}

        {/* Details toggle */}
        <Pressable
          onPress={() => setShowDetails((v) => !v)}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={{ fontSize: 12, fontWeight: "700", color: BLUE }}>
            {showDetails ? "Hide details" : "Details"}
          </Text>
          <Iconify
            icon={showDetails ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"}
            size={14}
            color={BLUE}
          />
        </Pressable>
      </Pressable>

      {/* Expandable timeline */}
      {showDetails ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: isSelected ? `${PRIMARY}33` : BORDER,
            paddingHorizontal: 14,
            paddingBottom: 14,
            backgroundColor: isSelected ? "#f0fdf4" : WHITE,
          }}
        >
          <RouteStepTimeline route={route} destinationLabel={destinationLabel} originName={originName} />
        </View>
      ) : null}
    </View>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────
export default function TripNavigate() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    query: string;
    fromStop: string;
    fromStopName: string;
    fromRoad: string;
  }>();
  const query = params.query ?? "";
  const fromStop = params.fromStop ?? "";
  const fromStopName = params.fromStopName ?? fromStop;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [phase, setPhase] = useState<"routes" | "navigating">("routes");

  const { data: tripPlan, isLoading, error } = useTripPlan(query, fromStop);

  const routes = tripPlan?.routes ?? [];
  const selectedRoute = routes[selectedIndex];
  const mapRegion = selectedRoute?.mapRegion ?? DEFAULT_REGION;
  const polylineCoords = selectedRoute?.polylineCoords ?? [];
  const recommendations: string[] = tripPlan?.recommendations ?? [];

  // All routes: dimmed unselected first (so selected renders on top)
  const allPolylines = [
    ...routes
      .filter((_, i) => i !== selectedIndex)
      .flatMap((r) => buildStepPolylines(r, "dimmed")),
    ...buildStepPolylines(selectedRoute ?? routes[0] ?? { steps: [], polylineCoords: [] } as any, "full"),
  ];

  const destinationLabel = tripPlan?.destination.address
    ? tripPlan.destination.address.split(",")[0]
    : query.replace(/^(how do i get to|fastest bus to|bus to|route to|get me to)\s*/i, "");

  const boardingCoord = tripPlan?.boardingStop.coordinate;
  const destCoord = tripPlan?.destination.coordinate;

  const mapMarkers = [
    ...(boardingCoord
      ? [{ id: "board", coordinate: boardingCoord, pinColor: BLUE, title: fromStopName }]
      : []),
    ...(destCoord
      ? [{ id: "dest", coordinate: destCoord, pinColor: "#ef4444", title: destinationLabel }]
      : []),
  ];

  // ── Loading ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: WHITE,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <ActivityIndicator color={PRIMARY} size="large" />
        <Text style={{ fontSize: 15, fontWeight: "700", color: FG }}>
          Planning your trip…
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: MUTED_FG,
            textAlign: "center",
            paddingHorizontal: 40,
            lineHeight: 18,
          }}
        >
          Finding routes via Google Maps{"\n"}and asking OmniBus AI
        </Text>
      </View>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: WHITE,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          paddingHorizontal: 32,
        }}
      >
        <Iconify icon="solar:danger-triangle-bold" size={48} color="#ef4444" />
        <Text style={{ fontSize: 16, fontWeight: "700", color: FG, textAlign: "center" }}>
          Couldn't plan trip
        </Text>
        <Text style={{ fontSize: 13, color: MUTED_FG, textAlign: "center" }}>
          {(error as Error).message}
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{
            marginTop: 8,
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: PRIMARY,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: WHITE, fontWeight: "700" }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  // ── No routes returned ──────────────────────────────────────────────────
  if (!isLoading && routes.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: WHITE,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          paddingHorizontal: 32,
        }}
      >
        <Iconify icon="solar:route-bold" size={48} color={MUTED_FG} />
        <Text style={{ fontSize: 16, fontWeight: "700", color: FG, textAlign: "center" }}>
          No routes found
        </Text>
        {recommendations[0] ? (
          <BoldText
            text={recommendations[0]}
            style={{ fontSize: 13, color: MUTED_FG, textAlign: "center", lineHeight: 20 }}
          />
        ) : null}
        <Pressable
          onPress={() => router.back()}
          style={{
            marginTop: 8,
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: PRIMARY,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: WHITE, fontWeight: "700" }}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  // ── Phase: NAVIGATING ───────────────────────────────────────────────────
  if (phase === "navigating") {
    const navRoute = selectedRoute;
    const firstTransit = navRoute?.steps.find((s) => s.transitDetails);

    return (
      <View style={{ flex: 1, backgroundColor: WHITE }}>
        <GoogleMap
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          initialRegion={mapRegion}
          showsUserLocation
          fitCoordinates={polylineCoords.length > 1 ? polylineCoords : undefined}
          fitPadding={{ top: 100, right: 40, bottom: 160, left: 40 }}
          polylines={allPolylines}
          markers={mapMarkers}
        />

        {/* Top card */}
        <View
          style={{
            position: "absolute",
            top: insets.top + 12,
            left: 16,
            right: 16,
            zIndex: 40,
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              borderRadius: 16,
              padding: 14,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
              elevation: 8,
              borderWidth: 1,
              borderColor: BORDER,
            }}
          >
            <Pressable
              onPress={() => setPhase("routes")}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: MUTED_BG,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Iconify icon="solar:alt-arrow-left-linear" size={20} color={FG} />
            </Pressable>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <View
                  style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: BLUE }}
                />
                <Text style={{ fontSize: 11, fontWeight: "700", color: MUTED_FG }}>
                  {fromStopName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View
                  style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444" }}
                />
                <Text style={{ fontSize: 12, fontWeight: "700", color: FG }} numberOfLines={1}>
                  {destinationLabel}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: PRIMARY }}>
                {navRoute?.durationText}
              </Text>
              <Text style={{ fontSize: 10, color: MUTED_FG }}>{navRoute?.distanceText}</Text>
            </View>
          </View>
        </View>

        {/* Bottom info strip */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 40,
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 20,
              paddingBottom: insets.bottom + 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 12,
              gap: 14,
            }}
          >
            {firstTransit?.transitDetails ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: PRIMARY,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Iconify icon="solar:bus-bold" size={22} color={WHITE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", fontSize: 15, color: FG }}>
                    Board{" "}
                    <Text style={{ color: PRIMARY }}>
                      {firstTransit.transitDetails.lineName}
                    </Text>{" "}
                    at{" "}
                    <Text style={{ color: PRIMARY }}>
                      {firstTransit.transitDetails.departureStop}
                    </Text>
                  </Text>
                  {firstTransit.transitDetails.departureTimeText ? (
                    <Text style={{ fontSize: 12, color: MUTED_FG, marginTop: 2 }}>
                      Departs at {firstTransit.transitDetails.departureTimeText}
                    </Text>
                  ) : null}
                </View>
              </View>
            ) : null}

            <Pressable
              onPress={() => router.replace("/(tabs)")}
              style={({ pressed }) => ({
                height: 52,
                backgroundColor: MUTED_BG,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: BORDER,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ fontWeight: "700", fontSize: 15, color: FG }}>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  // ── Phase: ROUTES (main screen — matches screenshot) ────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      {/* Map fills the upper portion */}
      <GoogleMap
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        initialRegion={mapRegion}
        showsUserLocation
        showsMyLocationButton={false}
        fitCoordinates={polylineCoords.length > 1 ? polylineCoords : undefined}
        fitPadding={{ top: 100, right: 40, bottom: 380, left: 40 }}
        polylines={allPolylines}
        markers={mapMarkers}
      />

      {/* Top card */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 12,
          left: 16,
          right: 16,
          zIndex: 40,
        }}
      >
        <View
          style={{
            backgroundColor: WHITE,
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 8,
            borderWidth: 1,
            borderColor: BORDER,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: MUTED_BG,
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Iconify icon="solar:alt-arrow-left-linear" size={20} color={FG} />
          </Pressable>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Iconify icon="solar:map-point-bold" size={14} color={BLUE} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: FG }} numberOfLines={1}>
                {destinationLabel}
              </Text>
            </View>
            <Text style={{ fontSize: 11, color: MUTED_FG, marginTop: 2 }}>
              From {fromStopName}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom sheet */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          maxHeight: SCREEN_H * 0.62,
        }}
      >
        <View
          style={{
            backgroundColor: WHITE,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -6 },
            shadowOpacity: 0.12,
            shadowRadius: 24,
            elevation: 16,
          }}
        >
          {/* Drag handle */}
          <View style={{ alignItems: "center", paddingTop: 14, paddingBottom: 4 }}>
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#e0e0e0",
              }}
            />
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: insets.bottom + 16,
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Header */}
            <Text style={{ fontSize: 18, fontWeight: "700", color: FG, marginBottom: 4 }}>
              Recommended Routes
            </Text>

            {/* Route cards */}
            {routes.map((route, i) => (
              <RouteCard
                key={i}
                route={route}
                isSelected={i === selectedIndex}
                recommendation={recommendations[i]}
                destinationLabel={destinationLabel}
                originName={fromStopName}
                onPress={() => setSelectedIndex(i)}
              />
            ))}

            {/* Start Navigation button */}
            <Pressable
              onPress={() => setPhase("navigating")}
              style={({ pressed }) => ({
                height: 54,
                backgroundColor: PRIMARY,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                opacity: pressed ? 0.85 : 1,
                marginTop: 4,
                shadowColor: PRIMARY,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 6,
              })}
            >
              <Iconify icon="material-symbols:navigation-rounded" size={22} color={WHITE} />
              <Text style={{ color: WHITE, fontWeight: "700", fontSize: 16 }}>
                Start Navigation
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
