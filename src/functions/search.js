import axios from "axios";

export default async function searchBooks(
  api_key,
  titleRef,
  authorRef,
  ISBNRef
) {
  if (ISBNRef.current.value !== "") {
    return await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBNRef.current.value}&key=${api_key}`
    );
  } else if (titleRef.current.value !== "" && authorRef.current.value !== "") {
    return await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${titleRef.current.value}+inauthor:${authorRef.current.value}&orderBy=relevance&printType=BOOKS&key=${api_key}`
    );
  } else if (titleRef.current.value !== "" && authorRef.current.value === "") {
    return await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${titleRef.current.value}&orderBy=relevance&printType=BOOKS&key=${api_key}`
    );
  } else if (authorRef.current.value !== "" && titleRef.current.value === "") {
    return await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorRef.current.value}&orderBy=relevance&printType=BOOKS&key=${api_key}`
    );
  }
}
