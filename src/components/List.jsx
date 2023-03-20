export default function List({ booksToRead, booksReading, booksRead }) {
  return (
    <>
      {booksToRead.length > 0 &&
      booksReading.length > 0 &&
      booksRead.length > 0 ? (
        <section>
          <h2 className="text-neutral900 font-medium mb-1">Booklist</h2>

          <div className="mt-3">
            <h3 className="text-neutral900 font-medium mb-1">Reading</h3>
            {booksReading.map((book) => (
              <a
                key={book.id}
                href={`/${book.id}`}
                className="flex gap-x-2 justify-between flex-wrap mb-1 hover:underline hover:cursor-pointer"
              >
                <div>
                  <span>{book.title}</span> - <span>{book.author}</span>
                </div>
                <span>{book.created.split("-", 2).join("-")}</span>
              </a>
            ))}
          </div>

          <div className="mt-3">
            <h3 className="text-neutral900 font-medium mb-1">Read</h3>
            {booksRead.map((book) => (
              <a
                key={book.id}
                href={`/${book.id}`}
                className="flex gap-x-2 justify-between flex-wrap mb-1 hover:underline hover:cursor-pointer"
              >
                <div>
                  <span>{book.title}</span> - <span>{book.author}</span>
                </div>
                <span>{book.created.split("-", 2).join("-")}</span>
              </a>
            ))}
          </div>

          <div className="mt-3">
            <h3 className="text-neutral900 font-medium mb-1">To read</h3>
            {booksToRead.map((book) => (
              <a
                key={book.id}
                href={`/${book.id}`}
                className="flex gap-x-2 justify-between flex-wrap mb-1 hover:underline hover:cursor-pointer"
              >
                <div>
                  <span>{book.title}</span> - <span>{book.author}</span>
                </div>
                <span>{book.created.split("-", 2).join("-")}</span>
              </a>
            ))}
          </div>
        </section>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
