export default function Title({ title, description }) {
  return (
    <div className="max-w-md">
      <h2 className="text-2xl mb-2">{title}</h2>
      <p className="mb-12 text-sm text-neutral-400">{description}</p>
    </div>
  );
}
