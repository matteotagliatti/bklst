import { useRef } from "react";
import { redirect } from "react-router-dom";

export default function Create({ pb, getBooklist, userID }) {
  const titleRef = useRef();
  const authorRef = useRef();
  const statusRef = useRef();

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

  return (
    <section>
      <h2 className="text-neutral900 font-medium mb-1">Add book</h2>
      <form
        onSubmit={addBook}
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
          value="Add"
        />
      </form>
    </section>
  );
}
