export const hasServiceWorkerSupport = () => "serviceWorker" in navigator;

export const registerServiceWorker = () => {
  if (!hasServiceWorkerSupport()) {
    console.debug("service worker not supported.");
    return;
  }

  // Use the window load event to keep the page load performant
  window.addEventListener("load", async () => {
    try {
      console.log("registering service worker...");
      await navigator.serviceWorker.register("/entry.worker.js", {
        type: "module",
      });
      await navigator.serviceWorker.ready;
      console.log("done");
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SYNC_REMIX_MANIFEST",
          manifest: window.__remixManifest,
        });
      } else {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          navigator.serviceWorker.controller?.postMessage({
            type: "SYNC_REMIX_MANIFEST",
            manifest: window.__remixManifest,
          });
        });
      }
    } catch (error) {
      console.error("Service worker registration failed", error);
    }
  });
};
