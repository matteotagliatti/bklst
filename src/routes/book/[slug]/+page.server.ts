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
    book.updated_at = new Date().toISOString();
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

    throw redirect(303, `/${book.status !== "reading" ? book.status : ""}`);
  },
  delete: async ({ request, params, locals: { supabase } }) => {
    const id = params.slug;
    const formData = await request.formData();

    const redirectPath = String(formData.get("status"));

    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      return {
        errorMessage: error.message,
      };
    }

    throw redirect(303, `/${redirectPath !== "reading" ? redirectPath : ""}`);
  },
};
