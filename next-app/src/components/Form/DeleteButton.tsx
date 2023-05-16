"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";
import LoaderIcon from "@/components/LoaderIcon";

export default function ({ book }: { book: any }) {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(false);

  async function deleteBook(event: any) {
    event.preventDefault();
    setLoading(true);

    if (!book) {
      return;
    }

    const { error } = await supabase.from("books").delete().eq("id", book.id);

    if (error) {
      console.log(error);
    }

    router.push("/");
    setLoading(false);
  }

  return (
    <button
      className="w-full text-sm text-center border border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-2 hover:cursor-pointer flex items-center justify-center gap-2"
      onClick={(e) => deleteBook(e)}
    >
      {loading ? <LoaderIcon /> : null}
      Delete
    </button>
  );
}
