import { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import Home from "./routes/Home";

import Login from "./components/Login";
const pb = new PocketBase("http://127.0.0.1:8090");

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        />
      ),
    },
    {
      path: "/add",
      element: <div>Add</div>,
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
    <main className="w-full max-w-xl mx-auto p-5 md:py-20">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
