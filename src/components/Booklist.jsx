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

          <div className="mt-3">
            <h3 className="text-neutral900 font-medium mb-1">Reading</h3>
            <List books={booksReading} />
          </div>

          <div className="mt-3">
            <h3 className="text-neutral900 font-medium mb-1">Read</h3>
            <List books={booksRead} />
          </div>

          <div className="mt-3">
            <h3 className="text-neutral900 font-medium mb-1">To read</h3>
            <List books={booksToRead} />
          </div>
        </section>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
