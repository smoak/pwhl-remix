import { normalizeGameType } from "./gameType";

describe("normalizeGameType", () => {
  describe("when the season id does not exist in the playoff seasons list", () => {
    let gameType: ReturnType<typeof normalizeGameType>;

    beforeEach(() => {
      gameType = normalizeGameType([{ id: "3", name: "2024 Playoffs" }], "1");
    });

    it("should be regular season", () => {
      expect(gameType).toBe("RegularSeason");
    });
  });

  describe("when the season id exists in the playoff seasons list", () => {
    let gameType: ReturnType<typeof normalizeGameType>;

    beforeEach(() => {
      gameType = normalizeGameType([{ id: "3", name: "2024 Playoffs" }], "3");
    });

    it("should be regular season", () => {
      expect(gameType).toBe("Playoff");
    });
  });
});
