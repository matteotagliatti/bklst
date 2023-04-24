import Link from "next/link";

interface BookProps {
  link?: boolean;
  href?: string;
  book: any;
}

export default function Book({ href, book }: BookProps) {
  function formatDate(string: string) {
    return string.replace(/ .*/, "").slice(2);
  }

  const classNames =
    "relative h-96 bg-neutral-100 flex items-center justify-center p-2 rounded-lg hover:bg-[#EEEEF0] transition-colors group";
  const innerElements = (
    <>
      <img
        className="w-32 md:w-36 lg:w-40 group-hover:-translate-y-1 transition-transform ease-in-out shadow-lg drop-shadow-lg"
        src={book.img}
        alt={book.title}
      />
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
        <div>
          <small className="block text-neutral-400">{book.author}</small>
          <p className="text-sm line-clamp-1">{book.title}</p>
        </div>
        <div className="text-neutral-400 text-right">
          <small className="block text-sm">{book.status}</small>
          {book.status === "read" ? (
            <small className="block">{formatDate(book.finished)}</small>
          ) : null}
        </div>
      </div>
    </>
  );

  if (!href) {
    return <div className={classNames}>{innerElements}</div>;
  }

  return (
    <Link
      href={{ pathname: href, query: book }}
      className={`${classNames} hover:cursor-pointer`}
    >
      {innerElements}
    </Link>
  );
}
