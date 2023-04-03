export default function SectionTitle({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <h2 className="text-2xl after">{title}</h2>
      <p className="text-sm text-neutral-400">{description}</p>
    </div>
  );
}
