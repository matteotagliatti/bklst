import Book from "./components/book";
import BooksContainer from "./components/bookscontainer";

export default function Home() {
  return (
    <>
      <div className="md:max-w-md mb-10 md:mt-10">
        <h1 className="text-4xl mb-2">
          Your <span className="italic">simple</span> and
          <br /> <span className="italic">personal</span> booklist
        </h1>
        <p className="text-sm text-neutral-400 mb-5">
          A very simple way to keep track of the books you read. No social media
          functions, no ads, no tracking. Just you and your books in a very
          clean interface. Forever{" "}
          <a
            className="underline"
            target="_blank"
            href="https://github.com/matteotagliatti/bklst"
          >
            open source
          </a>
          .
        </p>
        <a
          href="mailto:matteotagliatti@gmail.com?subject=Request to join Bklst&body=Hello, I'd love to join Bklst."
          className="text-sm flex items-center border border-neutral-200 hover:border-neutral-300 rounded-full px-2 py-1 w-fit gap-2"
          target="_blank"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66667 6L8 8.33333L11.3333 6"
              stroke="black"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.33333 11.3333V4.66667C1.33333 3.93029 1.93028 3.33334 2.66666 3.33334H13.3333C14.0697 3.33334 14.6667 3.93029 14.6667 4.66667V11.3333C14.6667 12.0697 14.0697 12.6667 13.3333 12.6667H2.66666C1.93028 12.6667 1.33333 12.0697 1.33333 11.3333Z"
              stroke="black"
              strokeWidth="1.2"
            />
          </svg>
          Request an invite
        </a>
      </div>
      <BooksContainer>
        <Book
          book={{
            title: "East of Eden",
            author: "John Steinbeck",
            img: "http://books.google.com/books/content?id=OPy6E5ZhXs0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            status: "read",
            finished: "2023-07-22",
          }}
        />
        <Book
          book={{
            title: "Sapiens",
            author: "Yuval Noah Harari",
            img: "http://books.google.com/books/content?id=1EiJAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            status: "reading",
          }}
        />
        <Book
          book={{
            title: "Stories of Breece D'J Pancake",
            author: "Breece D'J Pancake",
            img: "http://books.google.com/books/content?id=jWs5AQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            status: "to-read",
          }}
        />
        <Book
          book={{
            title: "Slaughterhouse-Five",
            author: "Kurt Vonnegut",
            img: "http://books.google.com/books/content?id=DLCSm6whrnEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            status: "to-read",
          }}
        />
        <Book
          book={{
            title: "Fellowship of the Ring",
            author: "J.R.R. Tolkien",
            img: "http://books.google.com/books/content?id=xFr92V2k3PIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            status: "reading",
          }}
        />
        <Book
          book={{
            title: "Fire & Blood",
            author: "George R.R. Martin",
            img: "http://books.google.com/books/content?id=Mj5XDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            status: "read",
            finished: "2023-03-21",
          }}
        />
      </BooksContainer>
    </>
  );
}