import { DonateButton } from "~/components/DonateButton";

export const Footer = () => (
  <footer className="container mx-auto px-4 pb-8 pt-16 text-center">
    <span>
      Made with <span className="text-rose-600">♥️</span> by{" "}
      <a
        href="https://github.com/smoak"
        target="_blank"
        rel="noreferrer"
        className="border-b-blue-500 text-blue-1000 hover:border-b-[1px]"
      >
        Sasha Moak
      </a>
    </span>
    <span className="flex items-center justify-center">
      <DonateButton />
    </span>
  </footer>
);
