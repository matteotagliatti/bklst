import { useState, useEffect } from "react";
import books from "./books.json";

function App() {
  const [booklist, setBooklist] = useState([]);

  useEffect(() => {
    setBooklist(books);
  }, []);

  function addBook() {
    const newBook = {
      id: 4,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
    };
    setBooklist([...booklist, newBook]);
  }

  return (
    <main className="w-full max-w-xl mx-auto py-20 p-5">
      <div>
        <h1 className="mb-1 text-neutral-900">(Basic) Booklist</h1>
        <p className="text-neutral-500">This is a basic booklist.</p>
      </div>
      <div className="mt-10">
        <p>Insert</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addBook}
        >
          Add Book
        </button>
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
