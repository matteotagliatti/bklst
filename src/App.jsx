import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { supabase } from "./supabase";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Book from "./routes/Book";
import Add from "./routes/Add";
import SignIn from "./routes/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./routes/ResetPassword";

function App() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [booksToRead, setBooksToRead] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [booksRead, setBooksRead] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (_event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  function setSession(session) {
    if (session) {
      const { user } = session;
      setUser(user);
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(null);
      sessionStorage.removeItem("user");
    }
  }

  useEffect(() => {
    if (user) {
      getBooklist();
    }
  }, [user]);

  async function getBooklist() {
    setLoading(true);
    const { data: books, error } = await supabase
      .from("books")
      .select()
      .eq("owner", user.id);

    if (error) {
      console.log(error);
    }

    setBooks(books);
    const booksToRead = books.filter((book) => book.status === "to-read");
    const booksReading = books.filter((book) => book.status === "reading");
    const booksRead = books.filter((book) => book.status === "read");
    setBooksToRead(booksToRead);
    setBooksReading(booksReading);
    setBooksRead(booksRead);
    setLoading(false);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          user={user}
          loading={loading}
          setLoading={setLoading}
          books={books}
          booksRead={booksRead}
          booksReading={booksReading}
          booksToRead={booksToRead}
        />
      ),
    },
    {
      path: "/sign-in",
      element: <SignIn user={user} loading={loading} setLoading={setLoading} />,
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
          <Add user={user} loading={loading} setLoading={setLoading} />
        </PrivateRoute>
      ),
    },
    {
      path: "/book/:bookID",
      element: (
        <PrivateRoute user={user}>
          <Book loading={loading} setLoading={setLoading} />
        </PrivateRoute>
      ),
    },
    {
      path: "/password-reset",
      element: <ResetPassword loading={loading} setLoading={setLoading} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
