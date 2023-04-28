import { useState } from "react";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import CreateEdit from "@/components/CreateEdit";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import BackIcon from "@/components/Back";
import { Book as BookType } from "@/global/types";
import LoaderIcon from "@/components/LoaderIcon";

export default function Book({ book }: { book: BookType }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function deleteBook(event: any) {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("books").delete().eq("id", book.id);

    if (error) {
      console.log(error);
    }

    router.push("/");
    setLoading(false);
  }

  return (
    <Layout variant={"small"}>
      <BackIcon href="/" />
      <Title
        title={"Edit"}
        description={"Edit the books infos below."}
        nopt={true}
      />

      <CreateEdit book={book} edit={true}>
        <a
          href="#modal"
          className="mt-7 w-fit text-sm border border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-2 hover:cursor-pointer"
        >
          <span>Delete</span>
        </a>
        <div
          id="modal"
          role="dialog"
          className="hidden target:flex fixed top-0 right-0 bottom-0 left-0 items-center justify-center bg-neutral-300 bg-opacity-50 z-10 backdrop-blur"
        >
          <div className="w-80 bg-white rounded-md shadow">
            <div className="flex justify-between items-center py-1 px-2 bg-neutral-100 rounded-t-md">
              <small className="text-neutral-500">Delete</small>
              <a href="#" className="bg-neutral-300 w-3 h-3 rounded-full"></a>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <svg
                  className="w-5 h-5 mb-4"
                  viewBox="0 0 60 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M59.1667 67.3332H51.5487L32.9465 48.731C31.3193 47.1039 28.6811 47.1039 27.0539 48.731L8.45178 67.3332L0.833328 67.3333V3.66667C0.833328 2.00982 2.17647 0.666672 3.83333 0.666672H56.1667C57.8235 0.666672 59.1667 2.00982 59.1667 3.66667V67.3332Z"
                    fill="black"
                  />
                </svg>
                <p className="text-sm">Are you sure?</p>
                <p className="text-sm text-neutral-400">
                  Click on delete to confirm.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="w-full text-sm text-center border border-neutral-200 hover:border-neutral-300 rounded-md px-5 py-2 hover:cursor-pointer"
                >
                  Cancel
                </a>
                <button
                  className="w-full text-sm text-center border border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-2 hover:cursor-pointer flex items-center justify-center gap-2"
                  onClick={(e) => deleteBook(e)}
                >
                  {loading ? <LoaderIcon /> : null}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </CreateEdit>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      props: {
        data: [],
      },
    };

  const bookID = ctx.query.id;
  const { data: book, error } = await supabase
    .from("books")
    .select()
    .eq("id", bookID);

  if (!book) {
    return {
      notFound: true,
    };
  }

  // Prevents users from editing other users books
  if (session.user.id !== book[0].owner) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialSession: session,
      book: book[0],
    },
  };
};
