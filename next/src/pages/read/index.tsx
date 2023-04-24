import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Header from "@/components/Header";
import BackIcon from "@/components/Back";
import BooksContainerInner from "@/components/BookContainerInner";
import Book from "@/components/Book";
import { Book as BookType } from "@/global/types";

export default function Reading({ books }: any) {
  return (
    <Layout>
      <Header />
      <BackIcon href="/" />
      <Title
        title={"Read"}
        description={"The last books I've read."}
        nopt={true}
        notitlemb={true}
      />
      <BooksContainerInner>
        {books
          .map((book: BookType) => {
            if (book.finished) {
              return {
                ...book,
                finishedDate: new Date(book.finished),
              };
            }
            return book;
          })
          .sort((a: any, b: any) => {
            if (a.finishedDate && b.finishedDate) {
              return b.finishedDate - a.finishedDate;
            }
            return 0;
          })
          .map((book: BookType) => (
            <Book key={book.id} href={`/book`} book={book} />
          ))}
      </BooksContainerInner>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Run queries with RLS on the server
  const { data: books } = await supabase
    .from("books")
    .select()
    .eq("owner", session.user.id)
    .eq("status", "read");

  return {
    props: {
      initialSession: session,
      books: books,
    },
  };
};
