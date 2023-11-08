import { redirect } from "@sveltejs/kit";
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

  throw redirect(303, `/${data.username}`);
};
