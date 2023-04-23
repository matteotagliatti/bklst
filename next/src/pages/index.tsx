import { useSession } from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";

export default function Home() {
  const session = useSession();

  return (
    <>
      <Header />
      <Layout>{!session ? <p>Not logged</p> : <p>Logged</p>}</Layout>
    </>
  );
}
