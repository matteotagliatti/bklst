import Link from "next/link";

interface TitleProps {
  title: string;
  description: string;
  link?: string;
  bookLength?: number;
}

export default function Title({
  title,
  description,
  link,
  bookLength,
}: TitleProps) {
  return (
    <div
      className={`flex flex-row pb-4 gap-2 justify-between items-end ${
        link ? null : "max-w-md"
      }`}
    >
      <div>
        <h2 className={`text-2xl mb-1`}>{title}</h2>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
      {link && bookLength ? (
        <>
          {bookLength > 3 ? (
            <Link
              className="group text-sm text-neutral-400 hover:underline flex gap-1 items-center"
              href={link}
            >
              See more{" "}
              <svg
                className="group-hover:-rotate-45 transition-transform duration-200"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
