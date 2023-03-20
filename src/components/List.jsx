export default function List({ booklist }) {
  return (
    <div className="mt-10">
      <h2 className="text-neutral900 font-medium mb-1">Booklist</h2>
      <ul>
        {booklist.map((book) => (
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
      </ul>
    </div>
  );
}
