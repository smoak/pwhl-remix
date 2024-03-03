// app/data/worker/cache.ts
var ASSET_CACHE = "asset-cache";
var DATA_CACHE = "data-cache";
var DOCUMENT_CACHE = "document-cache";

// app/data/worker/message.ts
var handleMessage = async (event) => {
  const cachePromises = /* @__PURE__ */ new Map();
  const { data } = event;
  if (data.type === "REMIX_NAVIGATION") {
    const { isMount, location, matches, manifest } = data;
    const documentUrl = location.pathname + location.search + location.hash;
    const [dataCache, documentCache, existingDocument] = await Promise.all([
      caches.open(DATA_CACHE),
      caches.open(DOCUMENT_CACHE),
      caches.match(documentUrl)
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
      matches.filter((m) => manifest.routes[m.id].hasLoader).forEach((m) => {
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

// node_modules/@remix-run/router/dist/router.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
var json = function json2(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
var validMutationMethodsArr = ["post", "put", "patch", "delete"];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
var validRequestMethods = new Set(validRequestMethodsArr);
var UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
var json3 = (data, init = {}) => {
  return json(data, init);
};

// app/data/worker/request.ts
var STATIC_ASSETS = ["/build/", "/icons/"];
var isMethod = (request, methods) => methods.includes(request.method.toLocaleLowerCase());
var isAssetRequest = (request) => isMethod(request, ["get"]) && STATIC_ASSETS.some((publicPath) => request.url.startsWith(publicPath));
var isLoaderRequest = (request) => {
  const url = new URL(request.url);
  return isMethod(request, ["get"]) && url.searchParams.get("_data");
};
var isDocumentGetRequest = (request) => isMethod(request, ["get"]) && request.mode === "navigate";
var handleAssetRequest = async (request) => {
  const url = new URL(request.url);
  const cached = await caches.match(request, {
    cacheName: ASSET_CACHE,
    ignoreVary: true,
    ignoreSearch: true
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
var handleLoaderRequest = async (request) => {
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
    return json3(
      { message: "Network Error" },
      {
        status: 500,
        headers: { "X-Remix-Catch": "yes", "X-Remix-Worker": "yes" }
      }
    );
  }
};
var handleDocumentGetRequest = async (request) => {
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
var handleRequest = async ({ request }) => {
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

// app/entry.worker.ts
var debugLog = (...messages) => {
  if (true) {
    console.debug(...messages);
  }
};
self.addEventListener("install", (event) => {
  debugLog("service worker installed");
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  debugLog("Service worker activated");
  event.waitUntil(self.clients.claim());
});
self.addEventListener("message", (event) => {
  event.waitUntil(handleMessage(event));
});
self.addEventListener("fetch", (event) => {
  return event.respondWith(handleRequest(event));
});
var defaultFetchHandler = () => {
  console.log("default fetch handler running");
};
export {
  defaultFetchHandler
};
/*! Bundled license information:

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.14.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/responses.js:
  (**
   * @remix-run/server-runtime v2.4.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v2.4.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
