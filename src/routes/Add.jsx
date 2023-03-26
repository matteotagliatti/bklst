import { useLocation, Link } from "react-router-dom";
import CreateEdit from "../components/Shared/CreateEdit";

export default function Add({ pb, user }) {
  const location = useLocation();
  const locationBook = location.state.book;
  const book = {
    title: locationBook.volumeInfo.title,
    author: locationBook.volumeInfo.authors[0],
    status: "to-read",
    img: locationBook.volumeInfo.imageLinks.thumbnail,
  };

  return (
    <>
      <Link to="/search">-- back</Link>
      {user ? <CreateEdit book={book} pb={pb} userID={user.record.id} /> : null}
    </>
  );
}
