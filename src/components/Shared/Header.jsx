import { Link } from "react-router-dom";

export default function Header({ user, setUser, pb }) {
  function logout() {
    sessionStorage.removeItem("authData");
    setUser(null);
    pb.authStore.clear();
  }

  return (
    <header className="absolute top-0 left-0 right-0 h-12 px-3 py-4 mx-2 flex justify-between items-center border-b border-neutral-100">
      <Link className="text-sm underline italic" to="/">
        Index
      </Link>
      <nav>
        {user ? (
          <div className="flex gap-4">
            <Link
              className="text-sm text-neutral-400 hover:underline"
              to="/search"
            >
              Search
            </Link>
            <button
              className="text-sm text-neutral-400 hover:underline"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            className="text-sm text-neutral-400 hover:underline"
            to="/login"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
