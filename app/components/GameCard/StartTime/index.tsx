import { useEffect, useState } from "react";

type StartTimeProps = {
  readonly date: Date;
};

const useLocales = (): string[] => {
  const [locales, setLocales] = useState(["en"]);

  useEffect(() => {
    setLocales([...window.navigator.languages]);
  }, []);

  return locales;
};

export const StartTime = ({ date }: StartTimeProps) => {
  const iso = date.toISOString();
  const locales = useLocales();

  return (
    <time dateTime={iso} title={iso}>
      {new Intl.DateTimeFormat(locales, { timeStyle: "short" }).format(date)}
    </time>
  );
};
