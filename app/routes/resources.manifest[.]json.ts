import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return json(
    {
      short_name: "PWHL",
      name: "PWHL Remix",
      start_url: "/",
      scope: "/",
      display: "standalone",
      orientation: "any",
      background_color: "#fff",
      description: "A simple readable PWHL app.",
      theme_color: "#33058d",
      icons: [
        {
          src: "/icons/logo.svg",
          sizes:
            "32x32 48x48 72x72 96x96 120x120 144x144 180x180 192x192 384x384 512x512",
          type: "image/svg+xml",
          purpose: "any",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    }
  );
};
