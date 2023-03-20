import { useEffect, useState, useRef } from "react";
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

  const titleRef = useRef();
  const authorRef = useRef();
  const statusRef = useRef();

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

  async function updateBook(event) {
    event.preventDefault();
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
    };
    await pb.collection("books").update(bookID, data);
    window.location.href = "/";
  }

  return (
    <>
      <Header
        title={book ? book.title : "Loading data..."}
        subtitle={book ? book.author : ""}
        button={headerButton}
      />
      {book ? (
        <>
          <form className="flex flex-col gap-2" onSubmit={updateBook}>
            <h2 className="font-medium">Edit book data</h2>
            <div className="flex gap-2">
              <label className="text-neutral-500" htmlFor="title">
                Title:
              </label>
              <input type="text" defaultValue={book.title} ref={titleRef} />
            </div>
            <div className="flex gap-2">
              <label className="text-neutral-500" htmlFor="author">
                Author:
              </label>
              <input type="text" defaultValue={book.author} ref={authorRef} />
            </div>

            <select
              className="w-fit"
              defaultValue={book.status}
              ref={statusRef}
            >
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
            <input
              className="w-fit hover:underline"
              type="submit"
              value="Update"
            />
          </form>
          <button
            className="w-fit text-red-600 hover:underline"
            onClick={deleteBook}
          >
            Delete
          </button>
        </>
      ) : null}
    </>
  );
}
