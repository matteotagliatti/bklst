import Link from "next/link";

interface TitleProps {
  title: string;
  description: string;
  link?: string;
  nopt?: boolean;
  notitlemb?: boolean;
}

export default function Title({
  title,
  description,
  link,
  nopt,
  notitlemb,
}: TitleProps) {
  let pt = "pt-14";
  if (nopt) {
    pt = "pt-0";
  }

  let mb = "mb-2";
  if (notitlemb) {
    mb = "mb-0";
  }

  return (
    <div
      className={`flex flex-row ${pt} pb-4 gap-2 justify-between items-end ${
        link ? null : "max-w-md"
      }`}
    >
      <div>
        <h2 className={`text-2xl ${mb}`}>{title}</h2>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
      {link ? (
        <Link
          className="group text-sm text-neutral-400 hover:underline"
          href={link}
        >
          See more →
        </Link>
      ) : null}
    </div>
  );
}
