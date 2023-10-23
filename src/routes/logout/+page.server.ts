import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();
    throw redirect(303, "/");
  },
};
