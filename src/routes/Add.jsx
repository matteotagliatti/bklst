import { Link } from "react-router-dom";
import CreateEdit from "../components/CreateEdit";

export default function Add({ pb, user }) {
  return (
    <>
      <Link to="/">-- back</Link>
      {user ? <CreateEdit pb={pb} userID={user.record.id} /> : null}
    </>
  );
}
