import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return json(
    {
      short_name: "PWHL",
      name: "PWHL Remix",
      start_url: "/",
      display: "standalone",
      background_color: "#fff",
      description: "A simple readable PWHL app.",
      theme_color: "#33058d",
      shortcuts: [
        {
          name: "Home",
          url: "/",
          icons: [
            {
              src: "/icons/icon-96x96.png",
              sizes: "96x96",
              type: "image/png",
              purpose: "any monochrome",
            },
          ],
        },
      ],
      icons: [
        {
          src: "/icons/logo.svg",
          sizes: "32x32 48x48 96x96 120x120 144x144 512x512",
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
