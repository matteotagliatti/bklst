import Header from "../components/Shared/Header";
import Booklist from "../components/Home/Booklist";
import Login from "../components/Home/Login";

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

  function logout() {
    sessionStorage.removeItem("authData");
    setUser(null);
    pb.authStore.clear();
  }

  return (
    <>
      <Header
        title={user ? `${user.record.name}'s ${headerTitle}` : `${headerTitle}`}
        subtitle={user ? "Your booklist." : " A basic booklist. Login to start"}
        buttons={user ? true : false}
        logout={logout}
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
