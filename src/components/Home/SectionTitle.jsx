import { Link } from "react-router-dom";

export default function SectionTitle({ title, description, link }) {
  return (
    <div className="flex flex-col md:flex-row pt-8 pb-4 gap-2 md:justify-between md:items-end">
      <div>
        <h2 className="text-2xl after">{title}</h2>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
      <Link
        className="group text-sm text-neutral-400 hover:underline"
        to={link}
      >
        See more →
      </Link>
    </div>
  );
}
