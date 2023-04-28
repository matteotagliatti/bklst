import { useRef, useState } from "react";
import searchBooks from "@/functions/search";
import Layout from "@/components/Layout";
import BackIcon from "@/components/Back";
import FormContainer from "@/components/Form/FormContainer";
import InputContainer from "@/components/Form/InputContainer";
import Label from "@/components/Form/Label";
import Input from "@/components/Form/Input";
import Submit from "@/components/Form/Submit";
import BooksContainer from "@/components/BooksContainer";
import Book from "@/components/Book";
import Title from "@/components/Title";

export default function Search() {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [noBooksMsg, setNoBooksMsg] = useState(false);
  const titleRef: any = useRef();
  const authorRef: any = useRef();
  const ISBNRef: any = useRef();

  async function fetchBooks(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      setNoBooksMsg(false);
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

      if (response.data.totalItems === 0) {
        setLoading(false);
        setNoBooksMsg(true);
        return;
      }

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
      <BackIcon href="/" />
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
            required={false}
            type="text"
            placeholder="Game of Thrones"
            inputRef={titleRef}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="author">Author</Label>
          <Input
            required={false}
            type="text"
            placeholder="George R.R. Martin"
            inputRef={authorRef}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            required={false}
            type="text"
            placeholder="880475172X"
            inputRef={ISBNRef}
          />
        </InputContainer>
        <Submit value={"Search"} loading={loading} />
      </FormContainer>
      <BooksContainer cols={2}>
        {noBooksMsg ? (
          <p className="text-sm">
            No books found!<br></br>Do another search.
          </p>
        ) : (
          <>
            {searchedBooks.map((searchedBook: any) => {
              const book = {
                id: searchedBook.id,
                title: searchedBook.volumeInfo.title,
                author: searchedBook.volumeInfo.authors
                  ? searchedBook.volumeInfo.authors[0]
                  : "Unknown",
                img: searchedBook.volumeInfo.imageLinks
                  ? searchedBook.volumeInfo.imageLinks.thumbnail
                  : "https://via.placeholder.com/150x150/e6e6e6/969696?text=No+Cover+Avaiable",
              };

              return <Book key={book.id} href={`/add`} book={book} />;
            })}
          </>
        )}
      </BooksContainer>
    </Layout>
  );
}
