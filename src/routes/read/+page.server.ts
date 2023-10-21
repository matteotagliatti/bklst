import type { BookType } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  locals: { supabase, getSession },
}) => {
  const session = await getSession();

  if (!session) {
    return;
  }

  const { data } = await supabase
    .from("books")
    .select()
    .eq("owner", session.user.id)
    .eq("status", "read")
    .order("finished", { ascending: false });

  const books = data as BookType[];
  return { books };
};
