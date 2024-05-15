import { Link, NavLink, useLoaderData } from "@remix-run/react";
import Logo from "~/components/icons/PwhlLogo";
import type { WithBootstrap } from "~/components/types";

const linkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-transparent hover:border-pwhl-purple-50";
const activeLinkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-pwhl-purple-50";

const PlayoffsLink = () => {
  const { playoffsStarted } = useLoaderData<WithBootstrap<unknown>>();

  if (!playoffsStarted) {
    return;
  }

  return (
    <NavLink
      to="/playoffs"
      className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
    >
      Playoffs
    </NavLink>
  );
};

export const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between">
      <Link to="/" aria-label="Home">
        <Logo width={96} height={96} />
      </Link>
      <nav className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
        >
          Home
        </NavLink>
        <NavLink
          to="/standings"
          className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
        >
          Standings
        </NavLink>
        <PlayoffsLink />
      </nav>
    </header>
  );
};
