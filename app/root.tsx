import nProgressStyles from "nprogress/nprogress.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Analytics } from "@vercel/analytics/react";
import "~/tailwind.css";
import { useServiceWorker } from "./hooks/useServiceWorker";
import { useNProgress } from "./hooks/useNProgress";

export const meta: MetaFunction = () => {
  return [
    {
      title: "PWHL Remix",
    },
    {
      name: "description",
      content: "A simple site to show PWHL scores, schedules and game details.",
    },
    {
      name: "theme-color",
      content: "#33058d",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://pwhl-remix.vercel.app",
    },
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
  ];
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: nProgressStyles },
  { rel: "icon", href: "/icons/favicon.ico", type: "image/x-icon" },
  { rel: "manifest", href: "/resources/manifest.json" },
];

const App = () => {
  useServiceWorker();
  useNProgress();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
};

export default App;
