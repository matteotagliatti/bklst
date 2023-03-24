import { Link } from "react-router-dom";

export default function Header({ title, subtitle, buttons, logout }) {
  return (
    <header className="flex flex-col-reverse md:flex-row flex-start md:justify-between md:items-center gap-y-10 md:gap-y-0">
      <div>
        <h1 className="font-medium mb-1 text-neutral-900">{title}</h1>
        <p className="text-neutral-500 mb-1">{subtitle}</p>
      </div>
      {buttons ? (
        <div className="flex flex-row justify-between gap-1 md:items-end md:flex-col">
          <button className="w-fit hover:underline" onClick={logout}>
            Logout
          </button>
          <Link className="w-fit hover:underline" to="/search">
            Search
          </Link>
        </div>
      ) : null}
    </header>
  );
}
