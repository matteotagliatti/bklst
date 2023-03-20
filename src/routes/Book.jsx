import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Book() {
  const headerButton = (
    <Link className="hover:underline" to="/">
      -- Back
    </Link>
  );

  return (
    <>
      <Header title="Book" subtitle="Book details" button={headerButton} />
    </>
  );
}
