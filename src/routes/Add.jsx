import { Link } from "react-router-dom";
import CreateEdit from "../components/CreateEdit";
import Search from "../components/Search";

export default function Add({ pb, user }) {
  return (
    <>
      <Link to="/">-- back</Link>
      <Search />
      {user ? <CreateEdit pb={pb} userID={user.record.id} /> : null}
    </>
  );
}
