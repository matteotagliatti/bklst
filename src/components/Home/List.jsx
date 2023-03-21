export default function List({ books }) {
  return (
    <>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <>
          {books.map((book) => (
            <a
              key={book.id}
              href={`/book/${book.id}`}
              className="flex gap-x-2 justify-between flex-wrap mb-1 hover:underline hover:cursor-pointer"
            >
              <div>
                <span>{book.title}</span> - <span>{book.author}</span>
              </div>
              <span>{book.created.split("-", 2).join("-")}</span>
            </a>
          ))}
        </>
      )}
    </>
  );
}
