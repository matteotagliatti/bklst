import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import Layout from "@/components/Layout";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return <Layout>{!session ? <p>Not logged</p> : <p>Logged</p>}</Layout>;
}
