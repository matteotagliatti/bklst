import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateEdit from "../components/Shared/CreateEdit";
import Layout from "../components/Shared/Layout";
import Title from "../components/Shared/Title";
import Back from "../components/UI/Back";

export default function Book({ pb }) {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook();
  }, [bookID]);

  async function getBook() {
    const book = await pb.collection("books").getOne(bookID);
    setBook(book);
  }

  async function deleteBook() {
    await pb.collection("books").delete(bookID);
    window.location.href = "/";
  }

  return (
    <Layout variant={"small"}>
      <Back to="/" />
      <Title title={"Edit"} description={"Edit the books infos below."} />
      {book ? (
        <>
          <CreateEdit pb={pb} book={book} bookID={bookID}>
            {/* <a href="#confirm" target="_self" className="w-fit">
              <span className="text-red-600">Delete</span>
              <div
                id="confirm"
                role="dialog"
                className="invisible target:visible flex gap-2"
              >
                <p>Are you sure?</p>
                <button
                  className="w-fit text-red-600 hover:underline"
                  onClick={deleteBook}
                >
                  Confirm
                </button>
              </div>
            </a> */}

            <button
              className="mt-7 w-fit text-sm border border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-2 hover:cursor-pointer"
              onClick={deleteBook}
            >
              Delete
            </button>
          </CreateEdit>
        </>
      ) : null}
    </Layout>
  );
}
