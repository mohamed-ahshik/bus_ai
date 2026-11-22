import { fixtureDataSource } from "../dataSource";

describe("fixtureDataSource", () => {
  it("returns the compact network", async () => {
    const network = await fixtureDataSource.getNetwork();
    expect(network.stations).toHaveLength(186);
    expect(network.lines).toHaveLength(9);
    expect(network.feedEndDate).toBe("2026-12-31");
  });

  it("returns five departures for Woodlands NSL", async () => {
    const timings = await fixtureDataSource.getTimings("NS9", "NSL", "0");
    expect(timings.departures).toHaveLength(5);
    expect(timings.station.codes.NSL).toBe("NS9");
    expect(timings.line.stations[0].name).toBe("Jurong East");
    expect(timings.scheduleAvailable).toBe(true);
  });

  it("returns TEL with the TE2 code", async () => {
    const timings = await fixtureDataSource.getTimings("NS9", "TEL", "1");
    expect(timings.station.codes.TEL).toBe("TE2");
    expect(timings.departures).toHaveLength(5);
  });
});
