import LoaderIcon from "./LoaderIcon";

export default function Loader() {
  return (
    <div className="grid h-full place-content-center">
      <div className="flex items-center gap-2 text-neutral-400">
        <LoaderIcon hw={"h-5 w-5"} />
        loading...
      </div>
    </div>
  );
}
