import LoaderIcon from "../../Shared/LoaderIcon";

export default function Submit({ value, loading }) {
  return (
    <button
      type="submit"
      className="mt-7 w-fit text-sm border border-neutral-200 hover:border-neutral-300 rounded-md px-5 py-2 hover:cursor-pointer flex gap-2 items-center"
    >
      {loading ? <LoaderIcon /> : null}
      {value}
    </button>
  );
}
