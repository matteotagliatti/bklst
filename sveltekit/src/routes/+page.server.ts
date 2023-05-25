import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  locals: { supabase, getSession },
}) => {
  const session = await getSession();

  if (!session) {
    return;
  }

  const { data: books } = await supabase
    .from("books")
    .select("*")
    .eq("owner", session?.user?.id)
    .order("created_at", { ascending: false })
    .limit(9);

  return { books };
};
