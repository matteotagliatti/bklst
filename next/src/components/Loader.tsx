import LoaderIcon from "./LoaderIcon";

export default function Loader() {
  return (
    <div className="flex items-center gap-2 text-neutral-400">
      <LoaderIcon />
      loading...
    </div>
  );
}
