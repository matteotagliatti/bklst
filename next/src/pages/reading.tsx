import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Header from "@/components/Header";
import BackIcon from "@/components/Back";
import BooksContainer from "@/components/BooksContainer";
import Book from "@/components/Book";
import { Book as BookType } from "@/global/types";

export default function Reading({ books }: any) {
  return (
    <Layout>
      <Header />
      <BackIcon href="/" />
      <Title title={"Reading"} description={"Books I'm currently reading."} />
      <BooksContainer>
        {books
          .map((book: BookType) => {
            if (book.created_at) {
              return {
                ...book,
                createdDate: new Date(book.created_at),
              };
            }
            return book;
          })
          .sort((a: any, b: any) => {
            if (a.createdDate && b.createdDate) {
              return b.createdDate - a.createdDate;
            }
            return 0;
          })
          .map((book: BookType) => (
            <Book key={book.id} href={`/book`} book={book} />
          ))}
      </BooksContainer>
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
    .eq("status", "reading");

  return {
    props: {
      initialSession: session,
      books: books,
    },
  };
};
