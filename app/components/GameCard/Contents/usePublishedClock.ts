import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import type { FirebasePublishedClockSnapshot } from "~/data/types";

type PublishedClock = {
  readonly isFinal: boolean;
  readonly hasStarted: boolean;
};
type UsePublishedClock = (gameId: number) => PublishedClock | undefined;
export const usePublishedClock: UsePublishedClock = (gameId) => {
  const [snapshot, isLoading] = useObjectVal<FirebasePublishedClockSnapshot>(
    query(
      child(ref(firebaseDatabase), `/svf/pwhl/publishedclock/1/games/${gameId}`)
    )
  );

  if (!snapshot || isLoading) {
    return;
  }

  return {
    isFinal: snapshot.Final,
    hasStarted: snapshot.Started,
  };
};
