import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase";
import FormContainer from "../UI/Form/FormContainer";
import InputContainer from "../UI/Form/InputContainer";
import Label from "../UI/Form/Label";
import Input from "../UI/Form/Input";
import Submit from "../UI/Form/Submit";

export default function CreateEdit({
  userID,
  book,
  bookID,
  children,
  loading,
  setLoading,
}) {
  const [bookIsFinished, setBookIsFinished] = useState(false);
  const titleRef = useRef();
  const authorRef = useRef();
  const statusRef = useRef();
  const imgRef = useRef();
  const finishedRef = useRef();

  useEffect(() => {
    if (book) {
      titleRef.current.value = book.title;
      authorRef.current.value = book.author;
      statusRef.current.value = book.status ? book.status : "to-read";
      imgRef.current.value = book.img;
      finishedRef.current.value = book.finished
        ? book.finished.replace(/ .*/, "")
        : null;
    }
  }, [book]);

  useEffect(() => {
    toggleFinishedBook();
  }, []);

  async function addBook(event) {
    event.preventDefault();
    setLoading(true);
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      img: imgRef.current.value,
      finished:
        statusRef.current.value === "read" ? finishedRef.current.value : null,
      owner: userID,
    };
    const { error } = await supabase.from("books").insert(data);

    if (error) {
      console.log(error);
    } else {
      setLoading(false);
      window.location.href = "/";
    }
  }

  async function updateBook(event) {
    event.preventDefault();
    setLoading(true);
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      finished:
        statusRef.current.value === "read" ? finishedRef.current.value : null,
      img: imgRef.current.value,
    };
    await pb.collection("books").update(bookID, data);
    setLoading(false);
    window.location.href = "/";
  }

  function toggleFinishedBook() {
    if (statusRef.current.value === "read") {
      setBookIsFinished(true);
    } else {
      setBookIsFinished(false);
    }
  }

  return (
    <FormContainer onSubmit={bookID ? updateBook : addBook}>
      <div className="mb-2 bg-neutral-100 flex items-center justify-center p-10 rounded-lg">
        <img
          className="w-36 shadow-lg drop-shadow-lg"
          src={book.img}
          alt={book.title}
        />
      </div>
      <InputContainer>
        <Label htmlFor="img-url">Img URL:</Label>
        <Input
          required={true}
          type="text"
          placeholder="https://example.com/image.jpg"
          inputRef={imgRef}
        />
      </InputContainer>
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
          placeholder="George R. R. Martin"
          inputRef={authorRef}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="status">Status</Label>
        <select className="w-fit" ref={statusRef} onChange={toggleFinishedBook}>
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
      </InputContainer>
      <InputContainer hidden={bookIsFinished ? false : true}>
        <Label htmlFor="finished">Finished</Label>
        <input type="date" ref={finishedRef} />
      </InputContainer>

      <div className="flex gap-3 items-center">
        <Submit value={`${bookID ? "Update" : "Add"}`} loading={loading} />
        {children}
      </div>
    </FormContainer>
  );
}
