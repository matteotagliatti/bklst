import { useRef } from "react";

export default function Form({ pb }) {
  const titleRef = useRef();
  const authorRef = useRef();

  async function addBook() {
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
    };
    const record = await pb.collection("books").create(data);
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
