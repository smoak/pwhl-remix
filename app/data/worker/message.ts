import type { AssetsManifest } from "@remix-run/dev";
import type { Location, UIMatch } from "@remix-run/react";
import { DATA_CACHE, DOCUMENT_CACHE } from "./cache";

type RemixNavigationEventData = {
  readonly type: "REMIX_NAVIGATION";
  readonly isMount: boolean;
  readonly location: Location;
  readonly manifest: AssetsManifest;
  readonly matches: UIMatch[];
};

export const handleMessage = async (
  event: ExtendableMessageEvent
): Promise<void> => {
  const cachePromises: Map<string, Promise<void>> = new Map();
  const { data } = event;

  if (data.type === "REMIX_NAVIGATION") {
    const { isMount, location, matches, manifest } =
      data as RemixNavigationEventData;
    const documentUrl = location.pathname + location.search + location.hash;

    const [dataCache, documentCache, existingDocument] = await Promise.all([
      caches.open(DATA_CACHE),
      caches.open(DOCUMENT_CACHE),
      caches.match(documentUrl),
    ]);

    if (!existingDocument || !isMount) {
      cachePromises.set(
        documentUrl,
        documentCache.add(documentUrl).catch((error) => {
          console.error(`Failed to cache document for ${documentUrl}:`, error);
        })
      );
    }

    if (isMount) {
      matches
        .filter((m) => manifest.routes[m.id].hasLoader)
        .forEach((m) => {
          const params = new URLSearchParams(location.search);
          params.set("_data", m.id);
          const search = params.size > 0 ? `${params.toString()}` : "";
          const url = location.pathname + search + location.hash;
          if (!cachePromises.has(url)) {
            cachePromises.set(
              url,
              dataCache.add(url).catch((error) => {
                console.error(`Failed to cache data for ${url}:`, error);
              })
            );
          }
        });
    }
  }

  await Promise.all(cachePromises.values());
};
