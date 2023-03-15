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
      <p>Insert</p>
      <form onSubmit={addBook}>
        <input required type="text" placeholder="Title" ref={titleRef} />
        <input required type="text" placeholder="Author" ref={authorRef} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
