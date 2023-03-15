export default function Header({ user, pb, setUser }) {
  const title = "(Basic) Booklist";

  function logout() {
    localStorage.removeItem("authData");
    setUser(null);
    pb.authStore.clear();
  }

  return (
    <header className="flex flex-col md:flex-row flex-start md:justify-between">
      <div>
        <h1 className="font-medium mb-1 text-neutral-900">
          {user ? user.record.name + "'s " + title : title}
        </h1>
        <p className="text-neutral-500 mb-1">
          {user ? "Your basic booklist" : "A basic booklist"}
        </p>
      </div>

      {user ? (
        <button className="w-fit" onClick={logout}>
          Logout
        </button>
      ) : null}
    </header>
  );
}
