import type { BookType } from "$lib/types.js";
import { BookSchema } from "$lib/zodSchemas.js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  update: async ({ request, params, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const formData = await request.formData();
    const id = params.slug;

    const book: BookType = {
      id: id,
      title: String(formData.get("title")),
      author: String(formData.get("author")),
      img: String(formData.get("img")),
      status: String(formData.get("status")),
      finished: String(formData.get("finished")),
      favorite: Boolean(formData.get("favorite")),
    };

    const safeParse = BookSchema.safeParse(book);

    if (!safeParse.success) {
      return fail(400, { issues: safeParse.error.issues });
    }

    if (!session) {
      throw Error("Unauthorized");
    }

    book.owner = session.user.id;
    if (!book.finished || book.status !== "read") book.finished = null;

    const { error } = await supabase
      .from("books")
      .update(book)
      .eq("id", book.id);

    if (error) {
      return {
        errorMessage: error.message,
      };
    }

    throw redirect(303, "/");
  },
  delete: async ({ params, locals: { supabase } }) => {
    const id = params.slug;

    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      return {
        errorMessage: error.message,
      };
    }

    throw redirect(303, "/");
  },
};
