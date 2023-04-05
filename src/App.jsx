import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PocketBase from "pocketbase";
const pb = new PocketBase("https://booklist.pockethost.io");
import Home from "./routes/Home";
import Search from "./routes/Search";
import Book from "./routes/Book";
import Add from "./routes/Add";
import SignIn from "./routes/SignIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [booksToRead, setBooksToRead] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [booksRead, setBooksRead] = useState([]);

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
          loading={loading}
        />
      ),
    },
    {
      path: "/sign-in",
      element: (
        <SignIn
          pb={pb}
          setUser={setUser}
          loading={loading}
          setLoading={setLoading}
        />
      ),
    },
    {
      path: "/search",
      element: (
        <PrivateRoute user={user}>
          <Search loading={loading} setLoading={setLoading} />
        </PrivateRoute>
      ),
    },
    {
      path: "/add",
      element: (
        <PrivateRoute user={user}>
          <Add pb={pb} user={user} />
        </PrivateRoute>
      ),
    },
    {
      path: "/book/:bookID",
      element: (
        <PrivateRoute user={user}>
          <Book pb={pb} />
        </PrivateRoute>
      ),
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
    setLoading(true);
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
    setLoading(false);
  }

  return <RouterProvider router={router} />;
}

export default App;
