import { Link } from "react-router-dom";

export default function SearchView({ searchedBooks }) {
  console.log(searchedBooks);

  return (
    <section>
      <h2 className="text-neutral900 font-medium mb-1">Searched books</h2>
      <div className="grid grid-cols-3 gap-5">
        {searchedBooks.map((book, index) => {
          const title = book.volumeInfo.title;
          const author = book.volumeInfo.authors[0];
          const img = book.volumeInfo.imageLinks;

          return (
            <Link
              to={`/add`}
              state={{ book }}
              className="bg-neutral-100 rounded p-5 hover:shadow-lg hover:cursor-pointer transition-all duration-100 flex flex-col gap-y-1 justify-center items-center"
              key={book.id + index}
            >
              <img
                className="h-28 w-fit object-cover"
                src={img ? img.thumbnail : ""}
                alt={title}
              />
              <p className="text-center">{title}</p>
              <p className="text-neutral-500 text-center">{author}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
