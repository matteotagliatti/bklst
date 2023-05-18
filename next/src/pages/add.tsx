import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import BackIcon from "@/components/Back";
import CreateEdit from "@/components/CreateEdit";

export default function Add() {
  const router = useRouter();
  const book = router.query;

  return (
    <Layout variant={"small"}>
      <BackIcon href="/search" />
      <Title title={"Add a book"} description="You can edit the infos below." />
      <CreateEdit book={book} />
    </Layout>
  );
}
