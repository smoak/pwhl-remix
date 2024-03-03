import { useLocation, useMatches } from "@remix-run/react";
import { useRef, useEffect } from "react";
import { hasServiceWorkerSupport } from "~/data/worker";

export const useServiceWorker = () => {
  const isMounted = useRef(true);
  const location = useLocation();
  const matches = useMatches();

  useEffect(() => {
    const mounted = isMounted.current;

    if (!hasServiceWorkerSupport()) {
      return;
    }

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller?.postMessage({
        type: "REMIX_NAVIGATION",
        isMount: mounted,
        location,
        matches,
        manifest: window.__remixManifest,
      });
    } else {
      const listener = async () => {
        await navigator.serviceWorker.ready;
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      };
      navigator.serviceWorker.addEventListener("controllerchange", listener);
      return () => {
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          listener
        );
      };
    }

    return () => {
      isMounted.current = false;
    };
  }, [location, matches]);
};
