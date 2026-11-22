import {
  FIXTURE_DEPARTURES,
  FIXTURE_LINES,
  FIXTURE_STATIONS,
} from "../fixture";

describe("train fixture", () => {
  it("contains the compact station and line counts", () => {
    expect(FIXTURE_STATIONS).toHaveLength(186);
    expect(FIXTURE_LINES).toHaveLength(9);
  });

  it("preserves interchange codes for Woodlands", () => {
    const woodlands = FIXTURE_STATIONS.find(
      (station) => station.id === "NS9",
    );
    expect(woodlands?.codes).toMatchObject({ NSL: "NS9", TEL: "TE2" });
  });

  it("keeps NSL station order", () => {
    const nsl = FIXTURE_LINES.find((line) => line.code === "NSL");
    expect(nsl?.stations[0]?.name).toBe("Jurong East");
    expect(nsl?.stations[nsl.stations.length - 1]?.name).toBe(
      "Marina South Pier",
    );
  });

  it("gives each direction its own departure pattern", () => {
    const byStationLine = new Map<string, Record<string, number[]>>();

    for (const [key, departures] of Object.entries(FIXTURE_DEPARTURES)) {
      const [stationId, line, direction] = key.split("|");
      const base = `${stationId}|${line}`;
      const entry = byStationLine.get(base) ?? {};
      entry[direction] = departures.map((item) => item.offsetMinutes);
      byStationLine.set(base, entry);
    }

    const identical = [...byStationLine.entries()]
      .filter(([, directions]) => {
        return (
          JSON.stringify(directions["0"]) ===
          JSON.stringify(directions["1"])
        );
      })
      .map(([base]) => base);

    expect(identical).toEqual([]);
  });
});
