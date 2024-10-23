import { json, type LoaderFunction } from "@remix-run/node";
import { getBootstrap, getStandings } from "~/api";
import { Layout } from "~/components/Layout";
import { LeagueStandings } from "~/components/LeagueStandings";
import type { Standings, WithBootstrap } from "~/components/types";
import { normalizeBootstrap } from "~/data/normalization/bootstrap";
import { normalizeStandings } from "~/data/normalization/standings";

export const loader: LoaderFunction = async () => {
  const bootstrap = await getBootstrap();
  const standingsResponse = await getStandings(bootstrap.current_season_id);

  const normalizedStandings = normalizeStandings(standingsResponse);
  const normalizedBootstrap = normalizeBootstrap(bootstrap);

  return json<WithBootstrap<Standings>>({
    content: normalizedStandings,
    ...normalizedBootstrap,
  });
};

const Index = () => {
  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Standings</h1>
      <LeagueStandings />
    </Layout>
  );
};

export default Index;
