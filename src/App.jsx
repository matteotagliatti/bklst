import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PocketBase from "pocketbase";
const pb = new PocketBase("https://booklist.pockethost.io");
import Home from "./routes/Home";
import Book from "./routes/Book";

function App() {
  const [booklist, setBooklist] = useState([]);
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          user={user}
          pb={pb}
          setUser={setUser}
          booklist={booklist}
          setBooklist={setBooklist}
          getBooklist={getBooklist}
        />
      ),
    },
    {
      path: "/:bookID",
      element: <Book pb={pb} />,
    },
  ]);

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

  return (
    <main className="w-full max-w-xl mx-auto p-5 md:py-20 flex flex-col gap-10">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
