export default function SectionTitle({ title, description }) {
  return (
    <div className="md:relative">
      <div className="md:sticky md:top-0 flex flex-col items-center py-10 md:py-40">
        <h2 className="text-2xl after">{title}</h2>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
