import axios from "axios";
import { useRef } from "react";

export default function Search({ setSearchedBooks }) {
  const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
  const titleRef = useRef();
  const authorRef = useRef();

  async function fetchBooks(e) {
    try {
      setSearchedBooks([]);
      e.preventDefault();
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${titleRef.current.value}+inauthor:${authorRef.current.value}&key=${api_key}`
      );
      let books = response.data.items.slice(0, 6);
      setSearchedBooks(books);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <h2 className="text-neutral900 font-medium mb-1">Search for a book</h2>
      <form
        onSubmit={fetchBooks}
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
            defaultValue={"East of eden"}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="author" className="text-neutral-500">
            Author:
          </label>
          <input
            required
            type="text"
            placeholder="Author"
            ref={authorRef}
            defaultValue={"Steinbeck"}
          />
        </div>

        <input
          className="w-fit hover:cursor-pointer hover:underline"
          type="submit"
          value={"Search"}
        />
      </form>
    </section>
  );
}
