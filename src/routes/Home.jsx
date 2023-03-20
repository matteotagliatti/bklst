import Header from "../components/Header";
import Booklist from "../components/Booklist";
import Login from "../components/Login";

export default function Home({
  user,
  pb,
  setUser,
  books,
  booksToRead,
  booksReading,
  booksRead,
}) {
  const headerTitle = "(Basic) Booklist";
  const headerButton = (
    <button className="w-fit hover:underline" onClick={logout}>
      Logout
    </button>
  );

  function logout() {
    sessionStorage.removeItem("authData");
    setUser(null);
    pb.authStore.clear();
  }

  return (
    <>
      <Header
        title={user ? `${user.record.name}'s ${headerTitle}` : `${headerTitle}`}
        subtitle={user ? "Your booklist" : " A basic booklist. Login to start"}
        button={user ? headerButton : null}
        add={user ? true : false}
      />
      {user ? (
        <Booklist
          books={books}
          booksToRead={booksToRead}
          booksReading={booksReading}
          booksRead={booksRead}
        />
      ) : (
        <Login pb={pb} setUser={setUser} />
      )}
    </>
  );
}
