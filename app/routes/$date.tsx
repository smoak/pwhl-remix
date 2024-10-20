import type { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData, useParams } from "@remix-run/react";
import { getBootstrap, getGamesByDate } from "~/api";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import type { Game, WithBootstrap } from "~/components/types";
import { normalizeBootstrap } from "~/data/normalization/bootstrap";
import { normalizeGames } from "~/data/normalization/games";
import { useDays } from "~/hooks/useDays";

export const loader: LoaderFunction = async ({ params }) => {
  const { date } = params;

  if (date == null) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  const scheduledGames = await getGamesByDate(new Date(date));
  const bootstrap = await getBootstrap();

  const normalizedGames = normalizeGames(scheduledGames, bootstrap);
  const normalizedBootstrap = normalizeBootstrap(bootstrap);

  return json<WithBootstrap<Game[]>>({
    content: normalizedGames,
    ...normalizedBootstrap,
  });
};

export const Index = () => {
  const { date } = useParams();
  const { prevDay, day, nextDay } = useDays(date);
  const { content: games } = useLoaderData<WithBootstrap<Game[]>>();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} filter={day} />
    </Layout>
  );
};

export default Index;
