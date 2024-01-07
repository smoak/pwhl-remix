import { Skeleton as GameCardSkeleton } from "../../GameCard/Skeleton";

export const Skeleton = () => {
  const loadingCards = new Array(6).fill(0).map(() => ({ key: Math.random() }));

  return (
    <div className="grid grid-cols-auto-fill gap-5">
      {loadingCards.map((card) => (
        <GameCardSkeleton key={card.key} />
      ))}
    </div>
  );
};
