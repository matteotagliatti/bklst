import Header from "../components/Header";
import List from "../components/List";
import Login from "../components/Login";
import CreateEdit from "../components/CreateEdit";

export default function Home({ user, pb, setUser, booklist, getBooklist }) {
  const headerTitle = "(Basic) Booklist";
  const headerButton = (
    <button className="w-fit hover:underline" onClick={logout}>
      Logout
    </button>
  );

  function logout() {
    localStorage.removeItem("authData");
    setUser(null);
    pb.authStore.clear();
  }

  return (
    <>
      <Header
        title={user ? `${user.record.name}'s ${headerTitle}` : `${headerTitle}`}
        subtitle={user ? "Your booklist" : " A basic booklist. Login to start"}
        button={user ? headerButton : null}
      />
      {user ? (
        <>
          <CreateEdit
            pb={pb}
            userID={user.record.id}
            getBooklist={getBooklist}
          />
          <List booklist={booklist} />
        </>
      ) : (
        <Login pb={pb} setUser={setUser} />
      )}
    </>
  );
}
