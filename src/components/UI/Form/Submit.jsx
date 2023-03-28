export default function Submit({ value, disabled }) {
  return (
    <input
      type="submit"
      className="mt-7 w-fit text-sm border border-neutral-200 hover:border-neutral-300 rounded-md px-5 py-2 hover:cursor-pointer"
      disabled={disabled}
      value={value}
    />
  );
}
