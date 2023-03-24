import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Shared/Header";
import CreateEdit from "../components/CreateEdit";

export default function Book({ pb }) {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);

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
      <Link className="hover:underline" to="/">
        -- Back
      </Link>
      <Header
        title={book ? book.title : "Loading data..."}
        subtitle={book ? book.author : ""}
      />
      {book ? (
        <>
          <CreateEdit pb={pb} book={book} bookID={bookID} />
          <a href="#confirm" target="_self" className="w-fit">
            <span className="text-red-600">Delete</span>
            <div
              id="confirm"
              role="dialog"
              className="invisible target:visible flex gap-2"
            >
              <p>Are you sure?</p>
              <button
                className="w-fit text-red-600 hover:underline"
                onClick={deleteBook}
              >
                Confirm
              </button>
            </div>
          </a>
        </>
      ) : null}
    </>
  );
}
