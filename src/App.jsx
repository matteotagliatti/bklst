import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PocketBase from "pocketbase";
const pb = new PocketBase("https://booklist.pockethost.io");
import Home from "./routes/Home";
import Add from "./routes/Add";
import Book from "./routes/Book";

function App() {
  const [booksToRead, setBooksToRead] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [booksRead, setBooksRead] = useState([]);
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          user={user}
          pb={pb}
          setUser={setUser}
          booksToRead={booksToRead}
          booksReading={booksReading}
          booksRead={booksRead}
          getBooklist={getBooklist}
        />
      ),
    },
    {
      path: "/add",
      element: <Add pb={pb} user={user} />,
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
    const books = await pb.collection("books").getFullList({
      filter: "owner.name = " + '"' + user.record.name + '"',
      sort: "-created",
    });
    const booksToRead = books.filter((book) => book.status === "to-read");
    const booksReading = books.filter((book) => book.status === "reading");
    const booksRead = books.filter((book) => book.status === "read");
    setBooksToRead(booksToRead);
    setBooksReading(booksReading);
    setBooksRead(booksRead);
  }

  return (
    <main className="w-full max-w-xl mx-auto p-5 md:py-20 flex flex-col gap-10">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
