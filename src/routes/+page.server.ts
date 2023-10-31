import type { Book } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  locals: { supabase, getSession },
}) => {
  const session = await getSession();

  if (!session) {
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", session.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    username: data.username as string,
  };
};
