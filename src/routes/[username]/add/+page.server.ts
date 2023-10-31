import type { BookInsert } from "$lib/types";
import { BookSchema } from "$lib/zodSchemas";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/");
  }

  return { url: url.origin };
};

export const actions = {
  add: async ({ params, request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, "/");
    }

    const formData = await request.formData();

    const book: BookInsert = {
      title: String(formData.get("title")),
      author: String(formData.get("author")),
      img: String(formData.get("img")),
      status: String(formData.get("status")),
      finished: String(formData.get("finished")),
      favorite: Boolean(formData.get("favorite")),
      owner: session.user.id,
    };

    const safeParse = BookSchema.safeParse(book);

    if (!safeParse.success) {
      return fail(400, { issues: safeParse.error.issues });
    }

    if (!session) {
      throw Error("Unauthorized");
    }

    if (!book.finished || book.status !== "read") book.finished = null;

    const { error } = await supabase.from("books").insert(book);

    if (error) {
      return {
        errorMessage: error.message,
      };
    }

    const { username } = params;

    throw redirect(
      303,
      `/${username}/${book.status !== "reading" ? book.status : ""}`
    );
  },
};
