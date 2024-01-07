import { useEffect, useState } from "react";

export const useHydration = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
