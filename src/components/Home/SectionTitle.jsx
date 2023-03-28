export default function SectionTitle({ title, description }) {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="text-2xl">{title}</h2>
      <p className="text-sm text-neutral-400">{description}</p>
    </div>
  );
}
