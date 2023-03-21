import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import SearchView from "../components/SearchView";

export default function Add({ pb, user }) {
  const [searchedBooks, setSearchedBooks] = useState([]);

  return (
    <>
      <Link to="/">-- back</Link>
      <Search setSearchedBooks={setSearchedBooks} />
      {searchedBooks.length > 0 ? (
        <SearchView searchedBooks={searchedBooks} />
      ) : null}
      {/* {user ? <CreateEdit pb={pb} userID={user.record.id} /> : null} */}
    </>
  );
}
