import { fetch } from "cross-fetch";
import { getToday } from "~/date-fns";
import type {
  BootstrapResponse,
  GameSummaryResponse,
  ModulekitResponse,
  PlayoffBracketResponse,
  ScheduledGame,
  StandingsResponse,
} from "./types";
import { differenceInCalendarDays, isBefore, isToday } from "date-fns";

export const BASE_URL = "https://lscluster.hockeytech.com/feed/index.php";
const CLIENT_CODE = "pwhl";
const CLIENT_KEY = "694cfeed58c932ee";

const calculateDaysByDate = (date?: Date) => {
  if (!date || isToday(date)) {
    return {
      daysAhead: "2",
      daysBack: "0",
    };
  }

  const today = getToday();
  const difference = Math.abs(differenceInCalendarDays(today, date)) + 2;

  if (isBefore(date, today)) {
    return {
      daysAhead: "1",
      daysBack: difference.toString(),
    };
  }

  return {
    daysAhead: difference.toString(),
    daysBack: "0",
  };
};

const requestWithKeys = (url: URL): URL => {
  url.searchParams.append("key", CLIENT_KEY);
  url.searchParams.append("client_code", CLIENT_CODE);
  return url;
};

type GetBootstrap = () => Promise<BootstrapResponse>;
export const getBootstrap: GetBootstrap = async () => {
  const url = requestWithKeys(new URL(BASE_URL));
  url.searchParams.append("feed", "statviewfeed");
  url.searchParams.append("view", "bootstrap");
  console.log("hitting url", url.toString());
  const response = await fetch(url.toString());
  const responseText = await response.text();

  const bootstrapResponse = JSON.parse(
    responseText.substring(1, responseText.length - 1)
  ) as BootstrapResponse;

  return bootstrapResponse;
};

type GetGamesByDate = (date?: Date) => Promise<ScheduledGame[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = requestWithKeys(new URL(BASE_URL));
  url.searchParams.append("feed", "modulekit");
  url.searchParams.append("view", "scorebar");
  url.searchParams.append("fmt", "json");
  const { daysAhead, daysBack } = calculateDaysByDate(date);
  url.searchParams.append("numberofdaysahead", daysAhead);
  url.searchParams.append("numberofdaysback", daysBack);
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());
  const { SiteKit } = (await response.json()) as ModulekitResponse;
  const games = SiteKit.Scorebar;

  return games;
};

type GetGameSummary = (gameId: string) => Promise<GameSummaryResponse>;
export const getGameSummary: GetGameSummary = async (gameId) => {
  const url = requestWithKeys(new URL(BASE_URL));
  url.searchParams.append("feed", "statviewfeed");
  url.searchParams.append("view", "gameSummary");
  url.searchParams.append("game_id", gameId);
  url.searchParams.append("fmt", "json");
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());
  const responseText = await response.text();
  const gameSummaryResponse = JSON.parse(
    responseText.substring(1, responseText.length - 1)
  ) as GameSummaryResponse;

  return gameSummaryResponse;
};

type GetStandings = (seasonId: string) => Promise<StandingsResponse>;
export const getStandings: GetStandings = async (seasonId) => {
  const url = requestWithKeys(new URL(BASE_URL));
  url.searchParams.append("feed", "statviewfeed");
  url.searchParams.append("view", "teams");
  url.searchParams.append("groupTeamsBy", "division");
  url.searchParams.append("context", "overall");
  url.searchParams.append("site_id", "2");
  url.searchParams.append("season", seasonId);
  url.searchParams.append("special", "false");
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());

  const responseText = await response.text();
  const standingsResponse = JSON.parse(
    responseText.substring(1, responseText.length - 1)
  ) as StandingsResponse;

  return standingsResponse;
};

type GetPlayoffBracket = () => Promise<PlayoffBracketResponse>;
export const getPlayoffBracket: GetPlayoffBracket = async () => {
  const url = requestWithKeys(new URL(BASE_URL));
  url.searchParams.append("feed", "modulekit");
  url.searchParams.append("view", "brackets");
  url.searchParams.append("fmt", "json");
  console.log("hitting url", url.toString());

  const response = await fetch(url.toString());
  const responseJson = await response.json();

  return responseJson as PlayoffBracketResponse;
};
