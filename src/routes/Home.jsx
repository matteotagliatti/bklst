import Header from "../components/Shared/Header";
import Layout from "../components/Shared/Layout";
import Booklist from "../components/Home/Booklist";

export default function Home({
  user,
  pb,
  setUser,
  books,
  booksToRead,
  booksReading,
  booksRead,
}) {
  return (
    <>
      <Header user={user} setUser={setUser} pb={pb} />
      <Layout>
        {user ? (
          <Booklist
            books={books}
            booksToRead={booksToRead}
            booksReading={booksReading}
            booksRead={booksRead}
          />
        ) : (
          <div className="md:max-w-md">
            <h1 className="text-4xl mb-2">
              Your <span className="italic">simple</span> and
              <br /> <span className="italic">personal</span> booklist
            </h1>
            <p className="text-sm text-neutral-400 mb-5">
              A very simple way to keep track of the books you read. No social
              media functions, no ads, no tracking. Just you and your books in a
              very clean interface. Forever free and{" "}
              <a
                className="underline"
                target="_blank"
                href="https://github.com/matteotagliatti/booklist"
              >
                open source
              </a>
              .
            </p>
            <a
              href="mailto:matteotagliatti@gmail.com"
              className="text-sm flex items-center border border-neutral-200 rounded-full px-2 py-1 w-fit gap-2"
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
        )}
      </Layout>
    </>
  );
}
