import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PocketBase from "pocketbase";
const pb = new PocketBase("https://booklist.pockethost.io");
import Home from "./routes/Home";
import Search from "./routes/Search";
import Book from "./routes/Book";
import Add from "./routes/Add";
import Login from "./routes/Login";

function App() {
  const [books, setBooks] = useState([]);
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
          books={books}
          booksToRead={booksToRead}
          booksReading={booksReading}
          booksRead={booksRead}
          getBooklist={getBooklist}
        />
      ),
    },
    {
      path: "/login",
      element: <Login pb={pb} setUser={setUser} />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/add",
      element: <Add pb={pb} user={user} />,
    },
    {
      path: "/book/:bookID",
      element: <Book pb={pb} />,
    },
  ]);

  useEffect(() => {
    const authData = JSON.parse(sessionStorage.getItem("authData"));
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
    setBooks(books);
    const booksToRead = books.filter((book) => book.status === "to-read");
    const booksReading = books.filter((book) => book.status === "reading");
    const booksRead = books.filter((book) => book.status === "read");
    setBooksToRead(booksToRead);
    setBooksReading(booksReading);
    setBooksRead(booksRead);
  }

  return <RouterProvider router={router} />;
}

export default App;
