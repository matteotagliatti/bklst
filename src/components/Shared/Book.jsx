import { Link } from "react-router-dom";

export default function Book({ link, to, book }) {
  const classNames =
    "relative h-80 md:h-96 bg-neutral-100 flex items-center justify-center p-2 rounded-lg hover:bg-[#EEEEF0] transition-colors hover:cursor-pointer group";
  const innerElements = (
    <>
      <img
        className="w-28 md:w-40 group-hover:-translate-y-1 transition-transform ease-in-out shadow-lg drop-shadow-lg"
        src={book.img}
        alt={book.title}
      />
      <div className="absolute left-3 bottom-3">
        <div className="flex gap-1 text-neutral-400">
          <small>{book.status}</small>
          {book.status === "read" ? (
            <>
              <small>-</small>
              <small>{book.finished}</small>
            </>
          ) : null}
        </div>
        <p>{book.title}</p>
      </div>
      <div className="absolute right-3 bottom-3">
        <p className="text-sm">{book.author}</p>
      </div>
    </>
  );

  if (link === false) {
    return <div className={classNames}>{innerElements}</div>;
  }

  return (
    <Link to={to} className={classNames}>
      {innerElements}
    </Link>
  );
}
