import { UserSchema } from "$lib/zodSchemas";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
  const session = await getSession();

  if (session) {
    throw redirect(303, "/");
  }

  return { url: url.origin };
};

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();

    const user = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    const safeParse = UserSchema.safeParse(user);

    if (!safeParse.success) {
      return fail(400, { issues: safeParse.error.issues });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      return {
        errorMessage: error.message,
      };
    }

    throw redirect(303, "/");
  },
};
