import { Link } from "react-router-dom";

export default function Header({ title, subtitle, button, add }) {
  return (
    <header className="flex flex-col-reverse gap-y-10 md:flex-row flex-start md:justify-between md:items-center">
      <div>
        <h1 className="font-medium mb-1 text-neutral-900">{title}</h1>
        <p className="text-neutral-500 mb-1">{subtitle}</p>
      </div>
      <div className="flex flex-row justify-between gap-1 md:items-end md:flex-col">
        {button}
        {add ? <Link to="/add">Add</Link> : null}
      </div>
    </header>
  );
}
