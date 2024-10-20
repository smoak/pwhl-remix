export const DonateButton = () => {
  return (
    <div className="flex min-w-11 items-center">
      <a
        href="https://ko-fi.com/sashamoak"
        target="_blank"
        rel="noreferrer noopener external"
        className="flex min-w-36 items-center rounded-lg bg-pwhl-purple-50 px-3 py-0.5 text-center text-white shadow"
      >
        <img
          alt=""
          src="https://storage.ko-fi.com/cdn/logomarkLogo.png"
          className="mr-1.5 h-4 w-6 animate-kofi-wiggle"
        />
        Support Me!
      </a>
    </div>
  );
};
