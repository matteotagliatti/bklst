import SectionTitle from "../components/Shared/SectionTitle";
import Layout from "../components/Shared/Layout";
import Book from "../components/Shared/Book";
import BooksContainerInner from "../components/Shared/BooksContainerInner";
import Back from "../components/UI/Back";
import Header from "../components/Shared/Header";

export default function BooksReading({ books, title, description, user }) {
  return (
    <Layout>
      <Header user={user} />
      <Back to="/" />
      <SectionTitle title={title} description={description} nopt={true} />
      <BooksContainerInner>
        {books.map((book) => (
          <Book key={book.id} to={`/book/${book.id}`} book={book} />
        ))}
      </BooksContainerInner>
    </Layout>
  );
}
