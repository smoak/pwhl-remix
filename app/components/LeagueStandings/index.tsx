import { useLoaderData } from "@remix-run/react";
import { type WithBootstrap, type Standings } from "../types";
import { TeamLogo } from "../TeamLogo";

type CellProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

const Cell = ({ children, className }: CellProps) => {
  return (
    <div
      className={`${
        className != null ? className : ""
      } table-cell border-b border-pwhl-purple-50 align-middle`}
    >
      {children}
    </div>
  );
};

export const LeagueStandings = () => {
  const { content: standings } = useLoaderData<WithBootstrap<Standings>>();

  return (
    <div className="inline-flex w-full flex-col gap-8">
      <section className="table w-full">
        <header className="table-header-group h-8 bg-pwhl-purple-50 text-center text-white">
          <div className="table-row">
            <div className="table-cell align-middle font-bold">Rank</div>
            <div className="table-cell align-middle font-bold">Team</div>
            <div className="table-cell align-middle font-bold">GP</div>
            <div className="table-cell align-middle font-bold">PTS</div>
            <div className="table-cell align-middle font-bold">W</div>
            <div className="table-cell align-middle font-bold">OTW</div>
            <div className="table-cell align-middle font-bold">OTL</div>
            <div className="table-cell align-middle font-bold">L</div>
          </div>
        </header>
        <div className="table-row-group">
          {standings.map((s, index) => (
            <div className="table-row h-14 text-center" key={s.teamAbbrev}>
              <Cell>{index + 1}</Cell>
              <Cell className="w-1/4">
                <div className="flex gap-2">
                  <TeamLogo
                    logoUrl={s.teamLogoUrl}
                    teamName={s.teamName}
                    size="sm"
                  />
                  <span className="hidden md:block">{s.teamName}</span>
                  <span className="md:hidden">{s.teamAbbrev}</span>
                </div>
              </Cell>
              <Cell>{s.gamesPlayed}</Cell>
              <Cell>{s.points}</Cell>
              <Cell>{s.regulationWins}</Cell>
              <Cell>{s.otWins}</Cell>
              <Cell>{s.otLosses}</Cell>
              <Cell>{s.losses}</Cell>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
