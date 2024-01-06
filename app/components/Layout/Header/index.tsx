import { Link, NavLink } from "@remix-run/react";
import Logo from "~/components/icons/PwhlLogo";

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between">
    <Link to="/" aria-label="Home">
      <Logo width={96} height={96} />
    </Link>
    <nav className="flex gap-6">
      <NavLink to="/">Home</NavLink>
    </nav>
  </header>
);
