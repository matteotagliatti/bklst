import { useEffect, useRef } from "react";

export default function CreateEdit({ pb, getBooklist, userID, book, bookID }) {
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

    titleRef.current.value = "";
    authorRef.current.value = "";
    getBooklist();
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
        {book ? "Update" : "Add"} book
      </h2>
      <form
        onSubmit={book ? updateBook : addBook}
        className="flex flex-col justify-start gap-y-1 md:gap-y-2"
      >
        <input required type="text" placeholder="Title" ref={titleRef} />
        <input required type="text" placeholder="Author" ref={authorRef} />
        <select className="w-fit" ref={statusRef}>
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
        <input
          className="w-fit hover:cursor-pointer hover:underline"
          type="submit"
          value={`${book ? "Update" : "Add"}`}
        />
      </form>
    </section>
  );
}
