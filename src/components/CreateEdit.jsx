import { useEffect, useRef } from "react";

export default function CreateEdit({ pb, userID, book, bookID }) {
  const titleRef = useRef();
  const authorRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    if (book) {
      titleRef.current.value = book.title;
      authorRef.current.value = book.author;
      statusRef.current.value = book.status;
    }
  }, [book]);

  async function addBook(event) {
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      owner: userID,
    };

    event.preventDefault();
    await pb.collection("books").create(data);
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
    <section>
      <h2 className="text-neutral900 font-medium mb-1">
        {bookID ? "Update" : "Add"} book
      </h2>
      <form
        onSubmit={bookID ? updateBook : addBook}
        className="flex flex-col justify-start gap-y-1 md:gap-y-2"
      >
        <div className="flex gap-2">
          <label htmlFor="title" className="text-neutral-500">
            Title:
          </label>
          <input
            id="title"
            required
            type="text"
            placeholder="Title"
            ref={titleRef}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="author" className="text-neutral-500">
            Author:
          </label>
          <input required type="text" placeholder="Author" ref={authorRef} />
        </div>
        <div className="flex gap-2">
          <label className="text-neutral-500" htmlFor="status">
            Status:
          </label>
          <select className="w-fit" ref={statusRef}>
            <option value="to-read">To Read</option>
            <option value="reading">Reading</option>
            <option value="read">Read</option>
          </select>
          {/* {statusRef.current.value === "read" ? <p>add a datepicker</p> : null} */}
        </div>
        <input
          className="w-fit hover:cursor-pointer hover:underline"
          type="submit"
          value={`${bookID ? "Update" : "Add"}`}
        />
      </form>
    </section>
  );
}
