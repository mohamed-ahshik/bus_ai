import { FIXTURE_LINES, FIXTURE_STATIONS } from "../fixture";
import {
  directionLabel,
  directionTerminals,
  isScheduleAvailable,
  isSnapshotStale,
  stationCode,
  stripWindow,
} from "../resolve";

const nsl = FIXTURE_LINES.find((line) => line.code === "NSL")!;
const woodlands = FIXTURE_STATIONS.find((station) => station.id === "NS9")!;

describe("direction", () => {
  it("uses the line terminals", () => {
    expect(directionTerminals(nsl)).toEqual({
      first: "Jurong East",
      last: "Marina South Pier",
    });
  });

  it("labels both directions", () => {
    expect(directionLabel(nsl, "0")).toBe("To Jurong East");
    expect(directionLabel(nsl, "1")).toBe("To Marina South Pier");
  });
});

describe("stationCode", () => {
  it("uses the per-line code for interchanges", () => {
    expect(stationCode(woodlands, "NSL")).toBe("NS9");
    expect(stationCode(woodlands, "TEL")).toBe("TE2");
  });
});

describe("stripWindow", () => {
  it("returns five stations around Woodlands", () => {
    const stations = stripWindow(nsl, "NS9");
    expect(stations.map((station) => station.code)).toEqual([
      "NS7",
      "NS8",
      "NS9",
      "NS10",
      "NS11",
    ]);
  });
});

describe("schedule availability", () => {
  it("is available before the feed end", () => {
    expect(
      isScheduleAvailable("2026-12-31", new Date("2026-11-22T06:00:00+08:00")),
    ).toBe(true);
  });

  it("is unavailable after the feed end", () => {
    expect(
      isScheduleAvailable("2026-12-31", new Date("2027-01-04T06:00:00+08:00")),
    ).toBe(false);
  });
});

describe("stale snapshot", () => {
  const now = Date.UTC(2026, 10, 22, 0, 0, 0);

  it("is fresh inside 7 days", () => {
    expect(isSnapshotStale("2026-11-20T00:00:00Z", now)).toBe(false);
  });

  it("is stale after 7 days", () => {
    expect(isSnapshotStale("2026-11-10T00:00:00Z", now)).toBe(true);
  });
});
