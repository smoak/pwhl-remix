import { useNavigate } from "@remix-run/react";
import ArrowIconLeft from "@heroicons/react/20/solid/ArrowLongLeftIcon";

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBackButton = () => navigate(-1);

  return (
    <div
      className="flex max-w-fit items-center py-5 transition-all duration-200 hover:cursor-pointer hover:opacity-60"
      onClick={handleBackButton}
    >
      <ArrowIconLeft className="h-5 w-5" />
      <span className="pl-3 text-xl">Back</span>
    </div>
  );
};
