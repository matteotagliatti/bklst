import { Link } from "react-router-dom";

export default function Book({ link, to }) {
  const classNames =
    "relative h-80 bg-neutral-200 flex items-center justify-center p-2 rounded-lg hover:bg-neutral-300 hover:cursor-pointer group";
  const innerElements = (
    <>
      <img
        className="w-24 group-hover:-translate-y-1 transition-transform ease-in-out"
        src="http://books.google.com/books/content?id=aB92oAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        alt=""
      />
      <div className="absolute left-3 bottom-3">
        <p className="text-sm text-neutral-400">Kurt Vonnegut</p>
        <p className="">Title</p>
      </div>
      ;
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
