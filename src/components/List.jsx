export default function List({ booklist }) {
  return (
    <div className="mt-10">
      <p>Booklist</p>
      <ul>
        {booklist.map((book) => (
          <li key={book.id}>
            <span>{book.title}</span> - <span>{book.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
