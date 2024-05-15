import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBootstrap, getGamesByDate } from "~/api";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import type { Game } from "~/components/types";
import { normalizeGames } from "~/data/normalization/games";
import { getToday } from "~/date-fns";
import { useDays } from "~/hooks/useDays";

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const scheduledGames = await getGamesByDate(today);
  const bootstrap = await getBootstrap();

  const normalizedGames = normalizeGames(scheduledGames, bootstrap);

  return json(normalizedGames);
};

const Index = () => {
  const games = useLoaderData<Game[]>();
  const { day, nextDay, prevDay } = useDays();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} nextDay={nextDay} prevDay={prevDay} />
      <GamesList games={games} filter={day} />
    </Layout>
  );
};

export default Index;
