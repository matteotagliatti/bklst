import { useRef } from "react";

export default function Create({ pb, getBooklist, userID }) {
  const titleRef = useRef();
  const authorRef = useRef();

  async function addBook(event) {
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      owner: userID,
    };

    event.preventDefault();
    const record = await pb.collection("books").create(data);

    titleRef.current.value = "";
    authorRef.current.value = "";
    getBooklist();
  }

  return (
    <div className="mt-10">
      <h2 className="text-neutral900 font-medium mb-1">Add a Book</h2>
      <form
        onSubmit={addBook}
        className="flex flex-col justify-start gap-y-1 md:flex-row md:justify-between"
      >
        <input required type="text" placeholder="Title" ref={titleRef} />
        <input required type="text" placeholder="Author" ref={authorRef} />
        <input className="w-fit" type="submit" value="Add" />
      </form>
    </div>
  );
}
