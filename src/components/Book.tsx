import Link from "next/link";
import Image from "next/image";

interface BookProps {
  href?: string;
  status?: boolean;
  book: any;
}

export default function Book({ href, status, book }: BookProps) {
  function formatDate(string: string) {
    return string.replace(/ .*/, "").slice(2);
  }

  const classNames =
    "relative md:h-96 bg-neutral-100 flex gap-5 items-center justify-start md:justify-center p-4 md:p-2 rounded-lg hover:bg-[#EEEEF0] transition-colors group";
  const innerElements = (
    <>
      <Image
        className="w-24 md:w-36 lg:w-40 group-hover:-translate-y-1 transition-transform ease-in-out shadow-lg drop-shadow-lg"
        width={400}
        height={400}
        priority
        src={book.img}
        alt={book.title}
      />
      <div className="md:absolute md:bottom-3 md:left-3 md:right-3 flex justify-between items-end">
        <div>
          <small className="block text-neutral-400">{book.author}</small>
          <p className="text-sm line-clamp-2 md:line-clamp-1">{book.title}</p>
        </div>
        <div className="absolute bottom-3 left-3 right-3 md:relative md:bottom-0 md:left-0 md:right-0 text-neutral-400 text-right">
          {status ? (
            <small className="block text-sm">{book.status}</small>
          ) : null}
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

  if (href === "/add") {
    return (
      <Link
        href={{ pathname: href, query: book }}
        className={`${classNames} hover:cursor-pointer`}
      >
        {innerElements}
      </Link>
    );
  }

  return (
    <Link
      href={{ pathname: href, query: { id: book.id } }}
      className={`${classNames} hover:cursor-pointer`}
    >
      {innerElements}
    </Link>
  );
}
