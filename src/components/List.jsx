export default function List({ booklist }) {
  return (
    <div className="mt-10">
      <p>Booklist</p>
      <ul>
        {booklist.map((book) => (
          <li key={book.id} className="flex justify-between">
            <div>
              <span>{book.title}</span> - <span>{book.author}</span>
            </div>
            <span>{book.created.split("-", 2).join("-")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
