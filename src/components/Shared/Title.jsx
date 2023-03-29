export default function Title({ title, description }) {
  return (
    <div className="max-w-md">
      <h2 className="mb-2 text-2xl">{title}</h2>
      <p className="mb-12 text-sm text-neutral-400">{description}</p>
    </div>
  );
}
