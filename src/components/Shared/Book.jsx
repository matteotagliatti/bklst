import { Link } from "react-router-dom";

export default function Book({ link, to, book }) {
  const classNames =
    "relative h-96 bg-neutral-100 flex items-center justify-center p-2 rounded-lg hover:bg-[#EEEEF0] transition-colors hover:cursor-pointer group";
  const innerElements = (
    <>
      <img
        className="w-32 md:w-40 group-hover:-translate-y-1 transition-transform ease-in-out shadow-lg drop-shadow-lg"
        src={book.img}
        alt={book.title}
      />
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
        <div>
          <div className="flex gap-1 text-neutral-400">
            <small>{book.status}</small>
            {book.status === "read" ? (
              <>
                <small>-</small>
                <small>{book.finished}</small>
              </>
            ) : null}
          </div>
          <p className="text-sm">{book.title}</p>
        </div>
        <div>
          <p className="text-sm text-right">{book.author}</p>
        </div>
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
