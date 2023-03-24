import List from "./List";

export default function Booklist({
  books,
  booksToRead,
  booksReading,
  booksRead,
}) {
  return (
    <>
      {books.length > 0 ? (
        <section>
          <h2 className="text-neutral900 font-medium mb-1">Booklist</h2>

          {booksReading.length > 0 ? (
            <div className="mt-5">
              <h3 className="text-neutral900 font-medium mb-1">Reading</h3>
              <List books={booksReading} />
            </div>
          ) : null}

          {booksRead.length > 0 ? (
            <div className="mt-5">
              <h3 className="text-neutral900 font-medium mb-1">Read</h3>
              <List books={booksRead} />
            </div>
          ) : null}

          {booksToRead.length > 0 ? (
            <div className="mt-5">
              <h3 className="text-neutral900 font-medium mb-1">To read</h3>
              <List books={booksToRead} />
            </div>
          ) : null}
        </section>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
