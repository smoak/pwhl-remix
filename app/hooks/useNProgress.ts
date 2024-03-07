import { useEffect } from "react";
import { useNavigation } from "@remix-run/react";
import nProgress from "nprogress";

export const useNProgress = () => {
  const { state: navigationState } = useNavigation();

  useEffect(() => {
    if (navigationState === "idle") {
      nProgress.done();
      return;
    }

    nProgress.start();
  }, [navigationState]);
};
