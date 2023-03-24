export default function List({ books }) {
  return (
    <>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <>
          {books
            // transform the date string into a date object
            .map((book) => {
              if (book.finished) {
                return {
                  ...book,
                  finishedDate: new Date(book.finished),
                };
              }
              return book;
            })
            // sort the books by the finished date
            .sort((a, b) => {
              if (a.finishedDate && b.finishedDate) {
                return b.finishedDate - a.finishedDate;
              }
              return 0;
            })
            .map((book) => (
              <a
                key={book.id}
                href={`/book/${book.id}`}
                className="flex gap-x-2 justify-between flex-wrap mb-1 hover:underline hover:cursor-pointer"
              >
                <div>
                  <span>{book.title}</span> - <span>{book.author}</span>
                </div>
                {book.status === "read" ? (
                  <span>{book.finished.replace(/ .*/, "")}</span>
                ) : null}
              </a>
            ))}
        </>
      )}
    </>
  );
}
