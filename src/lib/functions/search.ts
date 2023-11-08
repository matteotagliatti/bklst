export default async function searchBooks(
  api_key: string | null,
  title: string | null,
  author: string | null,
  isbn: string | null
): Promise<any> {
  let response;

  if (isbn) {
    response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${api_key}`
    );
  } else if (title && author) {
    response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&orderBy=relevance&printType=BOOKS&key=${api_key}`
    );
  } else if (title && !author) {
    response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&orderBy=relevance&printType=BOOKS&key=${api_key}`
    );
  } else if (author && !title) {
    response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&orderBy=relevance&printType=BOOKS&key=${api_key}`
    );
  }

  if (response) {
    const data = await response.json();
    return data;
  }
}
