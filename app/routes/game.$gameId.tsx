import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBootstrap, getGameSummary } from "~/api";
import { BackButton } from "~/components/BackButton";
import { GameCard } from "~/components/GameCard";
import { GameSummary } from "~/components/GameSummary";
import { Layout } from "~/components/Layout";
import type { GameDetails } from "~/components/types";
import { normalizeGameDetails } from "~/data/normalization/gameDetails";

export const loader: LoaderFunction = async ({ params }) => {
  const { gameId } = params;

  if (!gameId) {
    throw new Response("Not Found", { status: 404 });
  }

  const gameSummary = await getGameSummary(gameId);
  const bootstrap = await getBootstrap();
  const gameDetails = normalizeGameDetails(gameSummary, bootstrap);

  return json(gameDetails);
};

export const Index = () => {
  const gameDetails = useLoaderData<GameDetails>();

  return (
    <Layout>
      <BackButton />
      <div className="py-5 md:max-w-sm">
        <GameCard game={gameDetails.game} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <GameSummary gameDetails={gameDetails} />
      </div>
    </Layout>
  );
};

export default Index;
