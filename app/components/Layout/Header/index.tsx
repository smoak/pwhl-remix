import { Link, NavLink } from "@remix-run/react";
import Logo from "~/components/icons/PwhlLogo";

const linkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-transparent hover:border-pwhl-purple-50";
const activeLinkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-pwhl-purple-50";

export const Header = () => (
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
    </nav>
  </header>
);
