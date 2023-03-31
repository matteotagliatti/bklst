export default function Loader() {
  return (
    <div className="grid h-full place-content-center">
      <div className="flex items-center gap-2 text-neutral-400">
        <span className="h-6 w-6 block rounded-full border-2 border-t-neutral-400 animate-spin"></span>
        loading...
      </div>
    </div>
  );
}
