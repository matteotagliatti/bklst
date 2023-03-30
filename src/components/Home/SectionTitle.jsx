export default function SectionTitle({ title, description }) {
  return (
    <div className="relative flex flex-col items-center py-10 md:py-40">
      <h2 className="text-2xl after">{title}</h2>
      <p className="text-sm text-neutral-400">{description}</p>
    </div>
  );
}
