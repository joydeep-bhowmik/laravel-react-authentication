import Spinner from "@/components/ui/spinner";

function LoadingPlaceholder() {
  return (
    <div className="h-screen grid place-items-center">
      <Spinner />
    </div>
  );
}

export default LoadingPlaceholder;
