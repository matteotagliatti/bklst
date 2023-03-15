import { useState, useEffect } from "react";
import PocketBase from "pocketbase";

import Header from "./components/Header";
import Create from "./components/Create";
import List from "./components/List";
import { LoginLogout } from "./components/LogInLogout";
const pb = new PocketBase("http://127.0.0.1:8090");

function App() {
  const [booklist, setBooklist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    setUser(authData);
  }, []);

  useEffect(() => {
    if (user) {
      getBooklist();
    }
  }, [user]);

  async function getBooklist() {
    const records = await pb.collection("books").getFullList({
      filter: "owner.name = " + '"' + user.record.name + '"',
      sort: "-created",
    });
    setBooklist(records);
  }

  const logUser = () => {
    console.log(user);
  };

  return (
    <main className="w-full max-w-xl mx-auto py-10 md:py-20 p-5">
      {/* <button onClick={logUser}>LogUser</button> */}
      <Header user={user} />
      {user ? (
        <>
          <Create pb={pb} userID={user.record.id} getBooklist={getBooklist} />
          <List booklist={booklist} />
        </>
      ) : (
        <LoginLogout pb={pb} setUser={setUser} />
      )}
    </main>
  );
}

export default App;
