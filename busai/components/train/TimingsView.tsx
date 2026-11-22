import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Iconify } from "react-native-iconify";
import { useAppTheme } from "../../lib/ThemeContext";
import { useTrainNetwork } from "../../lib/hooks/useTrainNetwork";
import { useTrainTimings } from "../../lib/hooks/useTrainTimings";
import { formatSnapshotDate } from "../../lib/train/format";
import { LINE_META, TRAIN_LINES } from "../../lib/train/lines";
import { isSnapshotStale } from "../../lib/train/resolve";
import { rankStations } from "../../lib/train/search";
import type {
  TrainLineCode,
  TrainStation,
} from "../../lib/train/types";
import { AlsoAtRow } from "./AlsoAtRow";
import { DirectionToggle } from "./DirectionToggle";
import { InterchangeSheet } from "./InterchangeSheet";
import { LineBrowser } from "./LineBrowser";
import { LineStrip } from "./LineStrip";
import { StationSearch } from "./StationSearch";
import { TimingCard } from "./TimingCard";

const LAST_LINE_KEY = "trainDesignLastLine";

type Props = {
  refreshToken: number;
};

export function TimingsView({ refreshToken }: Props) {
  const { colors } = useAppTheme();
  const networkQuery = useTrainNetwork();
  const network = networkQuery.data;

  const [stationId, setStationId] = useState<string | null>(null);
  const [line, setLine] = useState<TrainLineCode | null>(null);
  const [direction, setDirection] = useState<"0" | "1">("0");
  const [query, setQuery] = useState("");
  const [sheetStation, setSheetStation] = useState<TrainStation | null>(null);
  const [lastUsedLine, setLastUsedLine] = useState<TrainLineCode | null>(null);

  const station = useMemo(
    () => network?.stations.find((item) => item.id === stationId) ?? null,
    [network, stationId],
  );
  const lineInfo = useMemo(
    () =>
      line
        ? network?.lines.find((item) => item.code === line) ?? null
        : null,
    [network, line],
  );

  useEffect(() => {
    if (!network || !stationId) return;
    const current = network.stations.find((item) => item.id === stationId);
    if (!current) {
      setStationId(null);
      setLine(null);
      return;
    }
    if (!line || !current.lines.includes(line)) {
      setLine(current.lines[0] ?? null);
      setDirection("0");
    }
  }, [network, stationId, line]);

  useEffect(() => {
    AsyncStorage.getItem(LAST_LINE_KEY)
      .then((value) => {
        if (value && value in LINE_META) {
          setLastUsedLine(value as TrainLineCode);
        }
      })
      .catch(() => {});
  }, []);

  const timingsQuery = useTrainTimings(
    station?.id ?? null,
    lineInfo?.code ?? null,
    direction,
    refreshToken,
  );

  const searchResults = useMemo(
    () => (network ? rankStations(network.stations, query) : []),
    [network, query],
  );

  const selectStation = (nextStation: TrainStation, nextLine: TrainLineCode) => {
    setStationId(nextStation.id);
    setLine(nextLine);
    setDirection("0");
    setQuery("");
    setSheetStation(null);
  };

  const selectFromSheet = (nextLine: TrainLineCode) => {
    if (!sheetStation) return;
    setLastUsedLine(nextLine);
    AsyncStorage.setItem(LAST_LINE_KEY, nextLine).catch(() => {});
    selectStation(sheetStation, nextLine);
  };

  const handleSearchResult = (item: TrainStation) => {
    if (item.lines.length === 1) {
      selectStation(item, item.lines[0]);
    } else {
      setSheetStation(item);
    }
  };

  const selectLine = (nextLine: TrainLineCode) => {
    setLine(nextLine);
    setDirection("0");
    setQuery("");
    if (station && !station.lines.includes(nextLine)) {
      setStationId(null);
    }
  };

  if (networkQuery.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
        <Text style={{ color: colors.mutedFg, fontSize: 12 }}>
          Loading train network…
        </Text>
      </View>
    );
  }

  if (networkQuery.isError || !network) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: colors.mutedFg, fontSize: 12 }}>
          {networkQuery.error instanceof Error
            ? networkQuery.error.message
            : "Could not load train network."}
        </Text>
        <Pressable onPress={() => networkQuery.refetch()}>
          <Text style={{ color: colors.primary, fontWeight: "700", fontSize: 12 }}>
            Tap to retry
          </Text>
        </Pressable>
      </View>
    );
  }

  const searching = query.trim().length > 0;
  const showStale =
    !searching && isSnapshotStale(network.snapshotAt);

  return (
    <View style={{ alignSelf: "stretch" }}>
      <StationSearch
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />

      {searching ? (
        <View style={styles.results}>
          <Text style={[styles.label, { color: colors.mutedFg }]}>STATIONS</Text>
          {searchResults.length === 0 ? (
            <Text style={{ color: colors.mutedFg, fontSize: 11.5 }}>
              No stations found.
            </Text>
          ) : (
            searchResults.map((item) => {
              const codes = item.lines
                .map((lineCode) => item.codes[lineCode] ?? item.id)
                .join(" · ");
              return (
                <Pressable
                  key={item.id}
                  onPress={() => handleSearchResult(item)}
                  style={[
                    styles.result,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.name}, ${codes}`}
                >
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={[styles.resultName, { color: colors.fg }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.resultCode, { color: colors.mutedFg }]}>
                      {codes}
                    </Text>
                  </View>
                  <View style={styles.badges}>
                    {item.lines.map((lineCode) => {
                      const info = LINE_META[lineCode];
                      return (
                        <View
                          key={lineCode}
                          style={[
                            styles.miniBadge,
                            { backgroundColor: info.color },
                          ]}
                        >
                          <Text style={styles.miniBadgeText}>{lineCode}</Text>
                        </View>
                      );
                    })}
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      ) : (
        <>
          <Text style={[styles.label, { color: colors.mutedFg }]}>
            BROWSE BY LINE
          </Text>
          <LineBrowser
            selectedLine={lineInfo?.code ?? null}
            onSelect={selectLine}
          />

          {station && lineInfo ? (
            <>
              <LineStrip
                line={lineInfo}
                stationId={station.id}
                onSelect={(nextStationId) => {
                  setStationId(nextStationId);
                  setDirection("0");
                }}
              />
              <DirectionToggle
                line={lineInfo}
                direction={direction}
                onChange={setDirection}
              />

              {timingsQuery.isLoading ? (
                <View style={styles.timingState}>
                  <ActivityIndicator color={colors.primary} size="small" />
                </View>
              ) : timingsQuery.isError ? (
                <View style={styles.timingState}>
                  <Text style={{ color: colors.mutedFg, fontSize: 11.5 }}>
                    Could not load departures.
                  </Text>
                  <Pressable onPress={() => timingsQuery.refetch()}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 11.5,
                        fontWeight: "700",
                      }}
                    >
                      Tap to retry
                    </Text>
                  </Pressable>
                </View>
              ) : timingsQuery.data ? (
                <>
                  <TimingCard
                    station={timingsQuery.data.station}
                    line={timingsQuery.data.line}
                    departures={timingsQuery.data.departures}
                    scheduleAvailable={timingsQuery.data.scheduleAvailable}
                  />
                  <AlsoAtRow
                    station={station}
                    selectedLine={lineInfo.code}
                    onSwitch={() => setSheetStation(station)}
                  />
                </>
              ) : null}
            </>
          ) : lineInfo ? (
            <>
              <LineStrip
                line={lineInfo}
                stationId={null}
                onSelect={(nextStationId) => {
                  setStationId(nextStationId);
                  setDirection("0");
                }}
              />
              <Text style={[styles.browseHint, { color: colors.mutedFg }]}>
                Tap a station on the line to see departures.
              </Text>
            </>
          ) : (
            <View
              style={[
                styles.emptyState,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Iconify
                icon="solar:magnifer-linear"
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.emptyTitle, { color: colors.fg }]}>
                Choose a line or search
              </Text>
              <Text style={[styles.emptyText, { color: colors.mutedFg }]}>
                Search for a station above, or pick a line to browse its stations.
              </Text>
            </View>
          )}

          {showStale && station && lineInfo ? (
            <Text style={[styles.stale, { color: colors.mutedFg }]}>
              Schedule snapshot from {formatSnapshotDate(network.snapshotAt)}
            </Text>
          ) : null}

          {station && lineInfo ? (
            <Text style={[styles.note, { color: colors.mutedFg }]}>
              Scheduled times · not live predictions
            </Text>
          ) : null}
        </>
      )}

      <InterchangeSheet
        visible={Boolean(sheetStation)}
        station={sheetStation}
        lines={TRAIN_LINES.map((lineMeta) => {
          const lineData = network.lines.find(
            (item) => item.code === lineMeta.code,
          );
          return lineData ?? {
            code: lineMeta.code,
            name: lineMeta.name,
            stations: [],
          };
        })}
        selectedLine={
          sheetStation && lastUsedLine && sheetStation.lines.includes(lastUsedLine)
            ? lastUsedLine
            : line
        }
        onSelect={selectFromSheet}
        onClose={() => setSheetStation(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    minHeight: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  label: {
    marginTop: 12,
    marginBottom: 7,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  browseHint: {
    marginTop: 10,
    fontSize: 10,
    textAlign: "center",
  },
  results: {
    marginTop: 10,
    gap: 8,
  },
  result: {
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  resultName: {
    fontSize: 13.5,
    fontWeight: "700",
  },
  resultCode: {
    marginTop: 2,
    fontSize: 10,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    justifyContent: "flex-end",
  },
  miniBadge: {
    minWidth: 38,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: "center",
  },
  miniBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  timingState: {
    marginTop: 10,
    minHeight: 90,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  emptyState: {
    marginTop: 16,
    paddingVertical: 28,
    paddingHorizontal: 22,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 7,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  emptyText: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  stale: {
    marginTop: 14,
    fontSize: 10,
    textAlign: "center",
  },
  note: {
    marginTop: 16,
    fontSize: 10,
    textAlign: "center",
  },
});
