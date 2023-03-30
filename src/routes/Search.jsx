import { useRef, useState } from "react";
import axios from "axios";
import Layout from "../components/Shared/Layout";
import Back from "../components/UI/Back";
import FormContainer from "../components/UI/Form/FormContainer";
import InputContainer from "../components/UI/Form/InputContainer";
import Label from "../components/UI/Form/Label";
import Input from "../components/UI/Form/Input";
import Submit from "../components/UI/Form/Submit";
import BooksContainer from "../components/Shared/BooksContainer";
import Book from "../components/Shared/Book";
import Title from "../components/Shared/Title";

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
    <Layout variant={"small"}>
      <Back to="/" />
      <Title
        title={"Search"}
        description={"Search for a book and add it to your booklist."}
      />
      <FormContainer onSubmit={fetchBooks}>
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
      </FormContainer>
      {searchedBooks.length > 0 ? (
        <BooksContainer cols={2}>
          {searchedBooks.map((searchedBook) => {
            const book = {
              id: searchedBook.id,
              title: searchedBook.volumeInfo.title,
              author: searchedBook.volumeInfo.authors[0],
              img: searchedBook.volumeInfo.imageLinks.thumbnail,
            };

            return <Book key={book.id} to={`/add`} book={book} />;
          })}
        </BooksContainer>
      ) : null}
    </Layout>
  );
}
