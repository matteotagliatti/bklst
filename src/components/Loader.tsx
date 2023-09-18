import LoaderIcon from "./LoaderIcon";

export default function Loader() {
  return (
    <div className="flex items-center gap-2">
      <LoaderIcon />
      <p className="text-sm text-neutral-400">loading...</p>
    </div>
  );
}
