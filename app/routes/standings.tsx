import { json, type LoaderFunction } from "@remix-run/node";
import { getStandings } from "~/api";
import { Layout } from "~/components/Layout";
import { LeagueStandings } from "~/components/LeagueStandings";
import { normalizeStandings } from "~/data/normalization/standings";

export const loader: LoaderFunction = async () => {
  const standingsResponse = await getStandings();

  const normalizedStandings = normalizeStandings(standingsResponse);

  return json(normalizedStandings);
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
