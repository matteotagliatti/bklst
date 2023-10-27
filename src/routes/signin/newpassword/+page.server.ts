import { fail } from "@sveltejs/kit";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    new: z.string().min(8),
    confirm: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.new !== data.confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["Password"],
      });
    }
  });

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw fail(401, { message: "not authorized" });
    }

    const formData = await request.formData();

    const data = {
      new: String(formData.get("new")),
      confirm: String(formData.get("confirm")),
    };

    const safeParse = changePasswordSchema.safeParse(data);

    if (!safeParse.success) {
      return fail(400, { issues: safeParse.error.issues });
    }

    const { error } = await supabase.auth.updateUser({
      password: data.confirm,
    });

    if (error) {
      return {
        errorMessage: error.message,
        success: false,
      };
    }

    return {
      success: true,
    };
  },
};
