import { normalizeEndState } from "./endState";

describe("normalizeEndState", () => {
  describe("when unofficial final and ended in period 3", () => {
    it("should be 'Regulation'", () => {
      expect(
        normalizeEndState({
          endedInPeriod: 3,
          gameStatusStringLong: "Unofficial Final",
        })
      ).toBe("Regulation");
    });
  });

  describe("when unofficial final and ended in period 4", () => {
    it("should be 'OT'", () => {
      expect(
        normalizeEndState({
          endedInPeriod: 4,
          gameStatusStringLong: "Unofficial Final",
        })
      ).toBe("OT");
    });
  });

  describe("when unofficial final and ended in period 5", () => {
    it("should be 'SO'", () => {
      expect(
        normalizeEndState({
          endedInPeriod: 5,
          gameStatusStringLong: "Unofficial Final",
        })
      ).toBe("SO");
    });
  });

  describe("when final", () => {
    it("should be 'Regulation'", () => {
      expect(
        normalizeEndState({ endedInPeriod: 3, gameStatusStringLong: "Final " })
      ).toBe("Regulation");
    });
  });

  describe("when final and game ended in ot", () => {
    it("should be 'OT'", () => {
      expect(
        normalizeEndState({
          endedInPeriod: 4,
          gameStatusStringLong: "Final 1st OT",
        })
      ).toBe("OT");
    });
  });

  describe("when final and game ended in so", () => {
    it("should be 'SO'", () => {
      expect(
        normalizeEndState({
          gameStatusStringLong: "Final SO",
          endedInPeriod: 5,
        })
      ).toBe("SO");
    });
  });
});
