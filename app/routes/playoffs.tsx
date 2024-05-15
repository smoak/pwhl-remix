import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPlayoffBracket } from "~/api";
import type {
  PlayoffBracketResponse,
  PlayoffBracketRound,
  PlayoffTeam,
  PlayoffTeams,
} from "~/api/types";
import { Layout } from "~/components/Layout";
import { TeamLogo } from "~/components/TeamLogo";

export const loader: LoaderFunction = async () => {
  const playoffBracketResponse = await getPlayoffBracket();
  return json(playoffBracketResponse);
};

type SeriesStatusProps = {
  readonly team1: PlayoffTeam;
  readonly team2: PlayoffTeam;
  readonly team1Wins: number;
  readonly team2Wins: number;
};
const SeriesStatus = ({
  team1,
  team1Wins,
  team2,
  team2Wins,
}: SeriesStatusProps) => {
  if (team1Wins === team2Wins) {
    return <span className="flex justify-center text-center">Series Tied</span>;
  }

  if (team1Wins === 3) {
    return (
      <span className="flex justify-center text-center">
        {team1.team_code} wins series
      </span>
    );
  }

  if (team2Wins === 3) {
    return (
      <span className="flex justify-center text-center">
        {team2.team_code} wins series
      </span>
    );
  }

  if (team1Wins > team2Wins) {
    return (
      <span className="flex justify-center text-center">
        {team1.team_code} leads series
      </span>
    );
  }

  return (
    <span className="flex justify-center">{team2.team_code} leads series</span>
  );
};

type PlayoffMatchupProps = {
  readonly team1: PlayoffTeam;
  readonly team2: PlayoffTeam;
  readonly team1Wins: number;
  readonly team2Wins: number;
};
const PlayoffMatchup = ({
  team1,
  team2,
  team1Wins,
  team2Wins,
}: PlayoffMatchupProps) => {
  return (
    <div className="flex gap-2 rounded-lg border border-pwhl-purple-50 p-6">
      <div className="flex w-1/3 flex-col items-center text-center">
        <TeamLogo logoUrl={team1.logo} teamName={team1.name} size="sm" />
        {team1.name}
      </div>
      <div className="flex w-1/3 flex-col justify-center">
        <div className="flex justify-center text-3xl font-bold">
          {team1Wins} - {team2Wins}
        </div>
        <SeriesStatus
          team1={team1}
          team1Wins={team1Wins}
          team2={team2}
          team2Wins={team2Wins}
        />
      </div>
      <div className="flex flex-grow flex-col items-center text-center">
        <TeamLogo logoUrl={team2.logo} teamName={team2.name} size="sm" />
        {team2.name}
      </div>
    </div>
  );
};

type PlayoffRoundProps = {
  readonly round: PlayoffBracketRound;
  readonly teams: PlayoffTeams;
};

const PlayoffRound = ({ round, teams }: PlayoffRoundProps) => {
  const matchups = round.matchups.filter(
    (m) => m.team1 !== "0" && m.team2 !== "0"
  );

  if (matchups.length === 0) {
    return (
      <div className="my-3 flex flex-col gap-2">
        <div className="border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
          {round.round_name}
        </div>
        <div className="flex justify-center font-bold">Series not started</div>
      </div>
    );
  }

  return (
    <div className="my-3 flex flex-col gap-2">
      <div className="border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
        {round.round_name}
      </div>
      {matchups.map(
        ({ series_letter, team1, team1_wins, team2, team2_wins }) => (
          <PlayoffMatchup
            key={series_letter}
            team1={teams[team1]}
            team2={teams[team2]}
            team1Wins={team1_wins}
            team2Wins={team2_wins}
          />
        )
      )}
    </div>
  );
};

const Index = () => {
  const { SiteKit } = useLoaderData<PlayoffBracketResponse>();
  const { Brackets } = SiteKit;
  const { rounds, teams } = Brackets;

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Playoff Bracket</h1>
      {rounds.map((round) => (
        <div className="flex flex-col" key={round.round}>
          <PlayoffRound round={round} key={round.round} teams={teams} />
        </div>
      ))}
    </Layout>
  );
};

export default Index;
