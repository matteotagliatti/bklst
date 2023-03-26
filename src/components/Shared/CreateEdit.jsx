import { useEffect, useRef, useState } from "react";

export default function CreateEdit({ pb, userID, book, bookID }) {
  const [bookIsFinished, setBookIsFinished] = useState(false);
  const titleRef = useRef();
  const authorRef = useRef();
  const statusRef = useRef();
  const imgRef = useRef();
  const finishedRef = useRef();

  useEffect(() => {
    if (book) {
      titleRef.current.value = book.title;
      authorRef.current.value = book.author;
      statusRef.current.value = book.status;
      finishedRef.current.value = book.finished
        ? book.finished.replace(/ .*/, "")
        : null;
      imgRef.current.value = book.img;
    }
  }, [book]);

  async function addBook(event) {
    event.preventDefault();
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      img: imgRef.current.value,
      finished:
        statusRef.current.value === "read" ? finishedRef.current.value : null,
      owner: userID,
    };
    await pb.collection("books").create(data);
    window.location.href = "/";
  }

  async function updateBook(event) {
    event.preventDefault();
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      finished:
        statusRef.current.value === "read" ? finishedRef.current.value : null,
      img: imgRef.current.value,
    };
    await pb.collection("books").update(bookID, data);
    window.location.href = "/";
  }

  function toggleFinishedBook() {
    if (statusRef.current.value === "read") {
      setBookIsFinished(true);
    } else {
      setBookIsFinished(false);
    }
  }

  useEffect(() => {
    toggleFinishedBook();
  });

  return (
    <section>
      <h2 className="text-neutral900 font-medium mb-1">
        {bookID ? "Update" : "Add"} book
      </h2>
      <form
        onSubmit={bookID ? updateBook : addBook}
        className="flex flex-col justify-start gap-y-1 md:gap-y-2"
      >
        <img className="w-28 object-cover" src={book.img} alt={book.title} />
        <div className="flex gap-2">
          <label htmlFor="img-url" className="text-neutral-500">
            Img Url:
          </label>
          <input
            id="img-url"
            required
            type="text"
            placeholder="Img Url"
            ref={imgRef}
          />
        </div>
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
          <select
            className="w-fit"
            ref={statusRef}
            onChange={toggleFinishedBook}
          >
            <option value="to-read">To Read</option>
            <option value="reading">Reading</option>
            <option value="read">Read</option>
          </select>
          <input
            className={bookIsFinished ? "visible" : "hidden"}
            type="date"
            ref={finishedRef}
          />
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
