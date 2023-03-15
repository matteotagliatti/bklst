import { useState, useEffect, useRef } from "react";
import Form from "./components/Form";

import PocketBase from "pocketbase";
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
      <div>
        <h1 className="mb-1 text-neutral-900">(Basic) Booklist</h1>
        <p className="text-neutral-500">This is a basic booklist.</p>
      </div>
      <Form pb={pb} />
      <div className="mt-10">
        <p>Booklist</p>
        <ul>
          {booklist.map((book) => (
            <li key={book.id}>
              <span>{book.title}</span> - <span>{book.author}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
