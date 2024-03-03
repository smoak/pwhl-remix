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

const isRemixNavigationEventData = (data: {
  readonly type: string;
}): data is RemixNavigationEventData => data.type === "REMIX_NAVIGATION";

export const handleMessage = async (
  event: ExtendableMessageEvent
): Promise<void> => {
  const cachePromises: Map<string, Promise<void>> = new Map();
  const { data } = event;

  if (isRemixNavigationEventData(data)) {
    const { isMount, location, matches, manifest } = data;
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
          const url = `${location.pathname}?${params.toString()}${
            location.hash
          }`;
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
