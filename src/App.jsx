import { useState, useEffect } from "react";
import books from "./books.json";

function App() {
  const [booklist, setBooklist] = useState([]);

  useEffect(() => {
    setBooklist(books);
    console.log(books);
  }, []);

  return (
    <main className="w-full max-w-xl mx-auto py-20 p-5">
      <div>
        <h1 className="mb-1 text-neutral-900">(Basic) Booklist</h1>
        <p className="text-neutral-500">This is a basic booklist.</p>
      </div>
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
