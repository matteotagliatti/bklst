import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

export default function Book({ pb }) {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);
  const headerButton = (
    <Link className="hover:underline" to="/">
      -- Back
    </Link>
  );

  useEffect(() => {
    getBook();
  }, [bookID]);

  async function getBook() {
    const book = await pb.collection("books").getOne(bookID);
    setBook(book);
  }

  return (
    <>
      <Header title="Book" subtitle="Book details" button={headerButton} />
      <span>{bookID}</span>
    </>
  );
}
