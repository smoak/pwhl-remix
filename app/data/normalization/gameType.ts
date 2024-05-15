import type { BootstrapResponse } from "~/api/types";
import type { GameType } from "~/components/types";

type NormalizeGameType = (
  playoffSeasons: BootstrapResponse["playoffSeasons"],
  seasonId: string
) => GameType;
export const normalizeGameType: NormalizeGameType = (
  playoffSeasons,
  seasonId
) => {
  const playoffIds = playoffSeasons.map(({ id }) => id);

  if (playoffIds.includes(seasonId)) {
    return "Playoff";
  }

  // TODO: add support for preason games
  return "RegularSeason";
};
