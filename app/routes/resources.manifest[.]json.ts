import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return json(
    {
      id: "/?homescreen=1",
      short_name: "PWHL",
      name: "PWHL Remix",
      start_url: "/",
      scope: "/",
      display: "standalone",
      display_override: ["window-controls-overlay", "standalone", "browser"],
      orientation: "any",
      background_color: "#fff",
      description: "A simple readable PWHL app.",
      theme_color: "#33058d",
      launch_handler: {
        client_mode: ["navigate-existing", "auto"],
      },
      icons: [
        {
          src: "/icons/icon-32x32.png",
          sizes: "32x32",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-196x196.png",
          sizes: "196x196",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/maskable_icon_x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/maskable_icon_x1024.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "maskable",
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
