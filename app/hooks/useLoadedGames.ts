import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { isLiveGame, type Game } from "~/components/types";
import { useRunOnVisible } from "./useRunOnVisible";

export const useLoadedGames = (route: string): Game[] => {
  const loadedGames = useLoaderData<Game[]>();
  const fetcher = useFetcher<Game[]>();
  const [games, setGames] = useState(loadedGames);

  const revalidate = () => {
    if (loadedGames.some(isLiveGame)) {
      fetcher.load(route);
    }
  };

  useEffect(() => {
    if (fetcher.data) {
      setGames(fetcher.data);
    }
  }, [fetcher.data]);

  useRunOnVisible(revalidate);

  return games;
};
