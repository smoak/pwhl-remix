/// <reference lib="WebWorker" />

import { handleMessage } from "./data/worker/message";
import { handleRequest } from "./data/worker/request";

declare let self: ServiceWorkerGlobalScope;

const debugLog = (...messages: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
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

// The default fetch event handler will be invoke if the
// route is not matched by any of the worker action/loader.
export const defaultFetchHandler = () => {
  console.log("default fetch handler running");
};
