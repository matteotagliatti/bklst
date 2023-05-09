"use client";

import { useRouter } from "next/navigation";
import { useSupabase } from "@/supabase-provider";

export default function Logout() {
  const { supabase } = useSupabase();
  const router = useRouter();

  function logout() {
    supabase.auth.signOut();
    router.push("/");
  }

  return (
    <button
      className="text-sm text-neutral-400 hover:underline"
      onClick={logout}
    >
      Logout
    </button>
  );
}
