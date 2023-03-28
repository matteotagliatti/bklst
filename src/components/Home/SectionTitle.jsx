export default function SectionTitle({ title, description }) {
  return (
    <div className="relative flex flex-col justify-center items-center py-10">
      <h2 className="text-2xl after">{title}</h2>
      <p className="text-sm text-neutral-400">{description}</p>
      <span className="hidden md:block md:absolute md:right-8 md:top-auto md:bottom-auto text-neutral-400 text-2xl rotate-90 md:rotate-0">
        &#8250;
      </span>
    </div>
  );
}
