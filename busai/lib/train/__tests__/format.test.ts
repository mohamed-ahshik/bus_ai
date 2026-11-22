import {
  formatClock,
  formatCountdown,
  formatEta,
  formatSnapshotDate,
} from "../format";

describe("formatCountdown", () => {
  const now = Date.UTC(2026, 10, 22, 0, 0, 0);

  it("returns minutes", () => {
    expect(formatCountdown(now + 2 * 60_000, now)).toEqual({
      value: "2",
      unit: "min",
    });
  });

  it("returns hours and minutes", () => {
    expect(formatCountdown(now + 65 * 60_000, now)).toEqual({
      value: "1",
      unit: "h 5m",
    });
  });

  it("returns due inside 30 seconds", () => {
    expect(formatCountdown(now + 10_000, now)).toEqual({
      value: "Due",
      unit: "",
    });
  });

  it("returns a dash after departure", () => {
    expect(formatCountdown(now - 120_000, now)).toEqual({
      value: "—",
      unit: "",
    });
  });
});

describe("formatEta", () => {
  const now = Date.UTC(2026, 10, 22, 0, 0, 0);

  it("formats minutes", () => {
    expect(formatEta(now + 8 * 60_000, now)).toBe("in 8 min");
  });

  it("formats hours", () => {
    expect(formatEta(now + 65 * 60_000, now)).toBe("in 1h 5m");
  });
});

describe("formatClock", () => {
  it("shows SGT clock time", () => {
    expect(formatClock("2026-11-22T06:07:00+08:00")).toBe("06:07");
  });
});

describe("formatSnapshotDate", () => {
  it("formats a snapshot date", () => {
    expect(formatSnapshotDate("2026-11-13T09:49:00+08:00")).toBe(
      "13 Nov 2026",
    );
  });
});
