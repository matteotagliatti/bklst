import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

export default function Book({ pb }) {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);
  const headerButton = (
    <Link className="hover:underline" to="/">
      -- Back
    </Link>
  );

  useEffect(() => {
    getBook();
  }, [bookID]);

  async function getBook() {
    const book = await pb.collection("books").getOne(bookID);
    setBook(book);
  }

  async function deleteBook() {
    await pb.collection("books").delete(bookID);
    window.location.href = "/";
  }

  return (
    <>
      <Header
        title={book ? book.title : "Loading data..."}
        subtitle={book ? book.author : ""}
        button={headerButton}
      />
      <div>
        {book ? (
          <>
            <button
              className="w-fit text-red-600 hover:underline"
              onClick={deleteBook}
            >
              Delete
            </button>
          </>
        ) : (
          "Loading data..."
        )}
      </div>
    </>
  );
}
