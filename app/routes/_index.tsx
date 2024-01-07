import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGamesByDate } from "~/api";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import type { Game } from "~/components/types";
import { normalizeGames } from "~/data/normalization/games";
import { getToday } from "~/date-fns";

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const scheduledGames = await getGamesByDate(today);

  const normalizedGames = normalizeGames(scheduledGames);

  return json(normalizedGames);
};

const Index = () => {
  const games = useLoaderData<Game[]>();
  console.log(games);
  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
