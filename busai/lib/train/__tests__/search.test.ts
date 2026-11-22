import { FIXTURE_STATIONS } from "../fixture";
import { rankStations } from "../search";

describe("rankStations", () => {
  it("returns matching stations, starts-with first", () => {
    const names = rankStations(FIXTURE_STATIONS, "wood").map(
      (station) => station.name,
    );
    expect(names[0]).toBe("Woodlands");
    expect(names).toContain("Woodlands North");
    expect(names).toContain("Woodlands South");
    expect(names).toContain("Woodleigh");
  });

  it("returns an empty list for an empty query", () => {
    expect(rankStations(FIXTURE_STATIONS, "   ")).toEqual([]);
  });

  it("caps results at 8 by default", () => {
    expect(rankStations(FIXTURE_STATIONS, "a").length).toBeLessThanOrEqual(8);
  });
});
