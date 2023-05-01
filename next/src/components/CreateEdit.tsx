import { useEffect, useRef, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/image";
import FormContainer from "@/components/Form/FormContainer";
import InputContainer from "@/components/Form/InputContainer";
import Label from "@/components/Form/Label";
import Input from "@/components/Form/Input";
import Submit from "@/components/Form/Submit";

interface CreateEditProps {
  book?: any;
  children?: React.ReactNode;
  edit?: boolean;
}

export default function CreateEdit({ book, children, edit }: CreateEditProps) {
  const supabase = useSupabaseClient();
  const session: any = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bookIsFinished, setBookIsFinished] = useState(false);
  const titleRef: any = useRef();
  const authorRef: any = useRef();
  const statusRef: any = useRef();
  const imgRef: any = useRef();
  const finishedRef: any = useRef();

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

  async function addBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      img: imgRef.current.value,
      finished:
        statusRef.current.value === "read" ? finishedRef.current.value : null,
      owner: session.user.id,
    };
    const { error } = await supabase.from("books").insert(data);

    if (error) {
      console.log(error);
    }

    router.push("/");
    setLoading(false);
  }

  async function updateBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const data = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      status: statusRef.current.value,
      img: imgRef.current.value,
      finished:
        statusRef.current.value === "read" ? finishedRef.current.value : null,
      owner: session.user.id,
    };
    const { error } = await supabase
      .from("books")
      .update(data)
      .eq("id", book.id);

    if (error) {
      console.log(error);
    }

    window.location.href = "/";
    setLoading(false);
  }

  function toggleFinishedBook() {
    if (statusRef.current.value === "read") {
      setBookIsFinished(true);
    } else {
      setBookIsFinished(false);
    }
  }

  return (
    <FormContainer onSubmit={edit ? updateBook : addBook}>
      <div className="mb-2 bg-neutral-100 flex items-center justify-center p-10 rounded-lg">
        <Image
          className="w-36 shadow-lg drop-shadow-lg"
          width={400}
          height={400}
          priority
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
        <input
          required={bookIsFinished ? true : false}
          type="date"
          ref={finishedRef}
        />
      </InputContainer>

      <div className="flex gap-3 items-center">
        <Submit value={edit ? `Update` : `Add`} loading={loading} />
        {children}
      </div>
    </FormContainer>
  );
}
