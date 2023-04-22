import { useRef, useState } from "react";
import searchBooks from "../functions/search";
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

export default function Search({ loading, setLoading }) {
  const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
  const titleRef = useRef();
  const authorRef = useRef();
  const ISBNRef = useRef();
  const [searchedBooks, setSearchedBooks] = useState([]);

  async function fetchBooks(e) {
    try {
      setLoading(true);
      setSearchedBooks([]);
      e.preventDefault();

      if (
        titleRef.current.value === "" &&
        authorRef.current.value === "" &&
        ISBNRef.current.value === ""
      ) {
        setLoading(false);
        return;
      }

      const response = await searchBooks(api_key, titleRef, authorRef, ISBNRef);
      let books =
        response.data.items.length > 6
          ? response.data.items.slice(0, 6)
          : response.data.items;
      setSearchedBooks(books);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout variant={"small"}>
      <Back to="/" />
      <Title
        title={"Search"}
        description={
          "Search for a book and add it to your booklist. Complete at least one field."
        }
        nopt={true}
      />
      <FormContainer onSubmit={fetchBooks}>
        <InputContainer>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            placeholder="Game of Thrones"
            inputRef={titleRef}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            placeholder="George R.R. Martin"
            inputRef={authorRef}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="isbn">ISBN</Label>
          <Input type="text" placeholder="880475172X" inputRef={ISBNRef} />
        </InputContainer>
        <Submit value={"Search"} loading={loading} />
      </FormContainer>
      <BooksContainer cols={2}>
        {searchedBooks.map((searchedBook) => {
          const book = {
            id: searchedBook.id,
            title: searchedBook.volumeInfo.title,
            author: searchedBook.volumeInfo.authors[0],
            img: searchedBook.volumeInfo.imageLinks
              ? searchedBook.volumeInfo.imageLinks.thumbnail
              : "https://via.placeholder.com/150x150/e6e6e6/969696?text=No+Cover+Avaiable",
          };

          return <Book key={book.id} to={`/add`} book={book} />;
        })}
      </BooksContainer>
    </Layout>
  );
}
