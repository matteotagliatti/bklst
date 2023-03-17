import { Link } from "react-router-dom";
import Header from "../components/Header";
import Create from "../components/Create";

export default function Add({ pb, user, getBooklist }) {
  const headerButtons = [<Link to={"/"}> -- back</Link>];

  return (
    <>
      <Header title="Add a Book" subtitle="Prova" buttons={headerButtons} />
      <Create pb={pb} userID={user.record.id} getBooklist={getBooklist} />
    </>
  );
}
