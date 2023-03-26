import axios from "axios";
import { useRef } from "react";

export default function SearchInput({ setSearchedBooks }) {
  const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
  const titleRef = useRef();
  const authorRef = useRef();

  async function fetchBooks(e) {
    try {
      setSearchedBooks([]);
      e.preventDefault();
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${titleRef.current.value}+inauthor:${authorRef.current.value}&orderBy=relevance&printType=BOOKS&key=${api_key}`
      );
      console.log(response.data.items.length);
      let books =
        response.data.items.length > 6
          ? response.data.items.slice(0, 6)
          : response.data.items;
      setSearchedBooks(books);
      sessionStorage.setItem("searchedBooks", JSON.stringify(books));
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
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="author" className="text-neutral-500">
            Author:
          </label>
          <input required type="text" placeholder="Author" ref={authorRef} />
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
