import { useEffect } from "react";
import { useNavigation } from "@remix-run/react";

export const useNProgress = () => {
  const { state: navigationState } = useNavigation();

  useEffect(() => {
    if (navigationState === "idle") {
      NProgress.done();
      return;
    }

    NProgress.start();
  }, [navigationState]);
};
