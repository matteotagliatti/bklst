export default function Label({ children, htmlFor }) {
  return (
    <label className="w-28 text-sm text-neutral-400 shrink-0" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
