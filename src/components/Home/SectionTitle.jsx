export default function SectionTitle({ title, description, noptmobile }) {
  let p = "py-10";
  if (noptmobile) p = "pb-10 md:py-10";
  let classNames = `relative flex flex-col justify-center items-center ${p}`;

  return (
    <div className={classNames}>
      <h2 className="text-2xl after">{title}</h2>
      <p className="text-sm text-neutral-400">{description}</p>
      <span className="hidden md:block absolute right-4 top-auto bottom-auto text-neutral-400 text-2xl">
        &#8250;
      </span>
    </div>
  );
}
