import { json } from "@remix-run/server-runtime";
import { ASSET_CACHE, DATA_CACHE, DOCUMENT_CACHE } from "./cache";

const STATIC_ASSETS = ["/build/", "/icons/"];

const isMethod = (request: Request, methods: string[]) =>
  methods.includes(request.method.toLocaleLowerCase());

const isAssetRequest = (request: Request) =>
  isMethod(request, ["get"]) &&
  STATIC_ASSETS.some((publicPath) => request.url.startsWith(publicPath));

const isLoaderRequest = (request: Request) => {
  const url = new URL(request.url);
  return isMethod(request, ["get"]) && url.searchParams.get("_data");
};

const isDocumentGetRequest = (request: Request) =>
  isMethod(request, ["get"]) && request.mode === "navigate";

const handleAssetRequest = async (request: Request) => {
  const url = new URL(request.url);
  const cached = await caches.match(request, {
    cacheName: ASSET_CACHE,
    ignoreVary: true,
    ignoreSearch: true,
  });

  if (cached) {
    console.log("Serving asset from cache", url.pathname);
    return cached;
  }

  console.log("Serving asset from network", url.pathname);
  const response = await fetch(request);

  if (response.status === 200) {
    const cache = await caches.open(ASSET_CACHE);
    await cache.put(request, response.clone());
  }

  return response;
};

const handleLoaderRequest = async (request: Request) => {
  const url = new URL(request.url);
  try {
    console.log("Serving data from network", url.pathname + url.search);
    const response = await fetch(request.clone());
    const cache = await caches.open(DATA_CACHE);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.log(
      "Serving data from network failed, falling back to cache",
      url.pathname + url.search
    );

    const response = await caches.match(request);

    if (response) {
      response.headers.set("X-Remix-Worker", "yes");
      return response;
    }

    return json(
      { message: "Network Error" },
      {
        status: 500,
        headers: { "X-Remix-Catch": "yes", "X-Remix-Worker": "yes" },
      }
    );
  }
};

const handleDocumentGetRequest = async (request: Request) => {
  const url = new URL(request.url);

  try {
    console.log("Serving document from network", url.pathname);
    const response = await fetch(request);
    const cache = await caches.open(DOCUMENT_CACHE);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.log(
      "Serving document from network failed, falling back to cache",
      url.pathname
    );
    const response = await caches.match(request);

    if (response) {
      return response;
    }

    throw error;
  }
};

export const handleRequest = async ({ request }: FetchEvent) => {
  if (isAssetRequest(request)) {
    return handleAssetRequest(request);
  }

  if (isLoaderRequest(request)) {
    return handleLoaderRequest(request);
  }

  if (isDocumentGetRequest(request)) {
    return handleDocumentGetRequest(request);
  }

  return fetch(request.clone());
};
