import type { BootstrapResponse } from "~/api/types";
import type { Bootstrap } from "~/components/types";

export const normalizeBootstrap = (response: BootstrapResponse): Bootstrap => {
  return {
    playoffsStarted: response.playoffSeasons.some(
      (season) => season.id === response.current_season_id
    ),
  };
};
