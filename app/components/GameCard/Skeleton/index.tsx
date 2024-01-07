const TeamInfoSkeleton = () => {
  return (
    <div className="flex w-1/3 flex-col items-center text-center">
      <span className="h-12 w-12 rounded bg-gray-200"></span>
      <span className="py-2" />
      <span className="h-4 w-12 rounded bg-gray-200"></span>
    </div>
  );
};
const SkeletonContents = () => {
  return (
    <>
      <TeamInfoSkeleton />
      <div className="mt-6 flex flex-1">
        <p className="flex h-4 flex-1 justify-center whitespace-nowrap rounded-full bg-gray-200 px-3 pt-1.5" />
      </div>
      <TeamInfoSkeleton />
    </>
  );
};

export const Skeleton = () => {
  return (
    <div className="flex h-36 rounded-lg border border-pwhl-purple-50">
      <div className="flex w-full animate-pulse p-8">
        <SkeletonContents />
      </div>
    </div>
  );
};
