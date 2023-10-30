import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
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

    const EmailSchema = z.string().email();

    const email = String(formData.get("email"));

    const safeParse = EmailSchema.safeParse(email);

    if (!safeParse.success) {
      return fail(400, { issues: safeParse.error.issues });
    }

    const { data: user, error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: "https://bklst.matteotagliatti.it/signin/newpassword",
      }
    );

    if (error) {
      return {
        errorMessage: error.message,
        success: false,
      };
    }

    return {
      data: user,
      success: true,
    };
  },
};
