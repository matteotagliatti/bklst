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
        title={"To Read"}
        description={"Books to read in the future."}
        nopt={true}
        notitlemb={true}
      />
      <BooksContainerInner>
        {books
          .sort((a: any, b: any) => {
            if (a.created_at && b.created_at) {
              return b.created_at - a.created_at;
            }
            return 0;
          })
          .map((book: BookType) => (
            <Book key={book.id} href={`/book/${book.id}`} book={book} />
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
    .eq("status", "to-read");

  return {
    props: {
      initialSession: session,
      books: books,
    },
  };
};
