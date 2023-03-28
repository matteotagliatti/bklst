import { useRef, useState } from "react";
import axios from "axios";
import Layout from "../components/Shared/Layout";
import Back from "../components/UI/Back";
import InputContainer from "../components/UI/Form/InputContainer";
import Label from "../components/UI/Form/Label";
import Input from "../components/UI/Form/Input";
import Submit from "../components/UI/Form/Submit";
import BooksContainer from "../components/Shared/BooksContainer";
import Book from "../components/Shared/Book";

export default function Search() {
  const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
  const titleRef = useRef();
  const authorRef = useRef();
  const [searchedBooks, setSearchedBooks] = useState([]);

  async function fetchBooks(e) {
    try {
      setSearchedBooks([]);
      e.preventDefault();
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${titleRef.current.value}+inauthor:${authorRef.current.value}&orderBy=relevance&printType=BOOKS&key=${api_key}`
      );
      let books =
        response.data.items.length > 6
          ? response.data.items.slice(0, 6)
          : response.data.items;
      setSearchedBooks(books);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Back to="/" />
      <div className="max-w-md">
        <h2 className="mb-2 text-2xl">Search</h2>
        <p className="mb-12 text-sm text-neutral-400">
          Search for a book and add it to your booklist.
        </p>
      </div>
      <form onSubmit={fetchBooks} className="flex flex-col md:max-w-md mb-12">
        <InputContainer>
          <Label htmlFor="title">Title</Label>
          <Input
            required={true}
            type="text"
            placeholder="Game of Thrones"
            inputRef={titleRef}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="author">Author</Label>
          <Input
            required={true}
            type="text"
            placeholder="George R.R. Martin"
            inputRef={authorRef}
          />
        </InputContainer>
        <Submit value={"Search"} />
      </form>
      {searchedBooks.length > 0 ? (
        <BooksContainer>
          {searchedBooks.map((searchedBook) => {
            const book = {
              id: searchedBook.id,
              title: searchedBook.volumeInfo.title,
              author: searchedBook.volumeInfo.authors[0],
              img: searchedBook.volumeInfo.imageLinks.thumbnail,
            };

            return <Book key={book.id} to={`/book/${book.id}`} book={book} />;
          })}
        </BooksContainer>
      ) : null}
    </Layout>
  );
}
