import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { supabase } from "./supabase";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Book from "./routes/Book";
import Add from "./routes/Add";
import SignIn from "./routes/SignIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const { user } = session;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      const { user } = session;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home user={user} loading={loading} setLoading={setLoading} />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
