import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

export default function Header({ user }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-12 px-3 py-4 mx-2 flex justify-between items-center border-b border-neutral-100 bg-white/75 backdrop-blur z-10">
      <div className="flex gap-4">
        <Link className="text-sm underline italic" to="/">
          Index
        </Link>
        {user ? (
          <Link
            className="text-sm text-neutral-400 hover:underline"
            to="/search"
          >
            Search
          </Link>
        ) : null}
      </div>
      <nav>
        {user ? (
          <button
            className="text-sm text-neutral-400 hover:underline"
            onClick={() => supabase.auth.signOut()}
          >
            Logout
          </button>
        ) : (
          <Link
            className="text-sm text-neutral-400 hover:underline"
            to="/sign-in"
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
