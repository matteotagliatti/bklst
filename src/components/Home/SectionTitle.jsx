export default function SectionTitle({ title, description, noptmobile }) {
  let classNames = "flex flex-col items-center justify-center";
  if (noptmobile) {
    classNames += " pb-6 md:py-6";
  } else {
    classNames += " py-6";
  }

  return (
    <div className={classNames}>
      <h2 className="text-2xl after">{title}</h2>
      <p className="text-sm text-neutral-400">{description}</p>
    </div>
  );
}
