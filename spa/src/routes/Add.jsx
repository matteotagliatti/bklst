import { useLocation } from "react-router-dom";
import Layout from "../components/Shared/Layout";
import Title from "../components/Shared/Title";
import Back from "../components/UI/Back";
import CreateEdit from "../components/Shared/CreateEdit";

export default function Add({ user, loading, setLoading }) {
  const location = useLocation();
  const locationBook = location.state.book;

  return (
    <Layout variant={"small"}>
      <Back to="/search" />
      <Title
        title={"Add a book"}
        description="You can edit the infos below."
        nopt={true}
      />
      <CreateEdit
        book={locationBook}
        userID={user.id}
        loading={loading}
        setLoading={setLoading}
      />
    </Layout>
  );
}