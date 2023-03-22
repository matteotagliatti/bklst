import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/Search/SearchInput";
import SearchView from "../components/Search/SearchView";

export default function Search() {
  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    const searchedBooks = JSON.parse(sessionStorage.getItem("searchedBooks"));
    setSearchedBooks(searchedBooks);
  }, []);

  return (
    <>
      <Link to="/">-- back</Link>
      <SearchInput setSearchedBooks={setSearchedBooks} />
      {searchedBooks ? <SearchView searchedBooks={searchedBooks} /> : null}
      {/* {user ? <CreateEdit pb={pb} userID={user.record.id} /> : null} */}
    </>
  );
}
