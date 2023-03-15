import { useState, useEffect } from "react";
import Form from "./components/Form";

import PocketBase from "pocketbase";
import Header from "./components/Header";
import List from "./components/List";
const pb = new PocketBase("http://127.0.0.1:8090");

function App() {
  const [booklist, setBooklist] = useState([]);

  useEffect(() => {
    getBooklist();
  }, []);

  async function getBooklist() {
    const records = await pb.collection("books").getFullList({
      sort: "-created",
    });
    setBooklist(records);
  }

  return (
    <main className="w-full max-w-xl mx-auto py-10 md:py-20 p-5">
      <Header />
      <Form pb={pb} />
      <List booklist={booklist} />
    </main>
  );
}

export default App;
