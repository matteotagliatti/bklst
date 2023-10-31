import { username } from "$lib/stores/username";
import type { BookUpdate } from "$lib/types";
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
  update: async ({ request, params, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, "/");
    }

    const formData = await request.formData();
    const { slug: id } = params;

    const book: BookUpdate = {
      id: Number(id),
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

    const { username } = params;

    throw redirect(
      303,
      `/${username}/${book.status !== "reading" ? book.status : ""}`
    );
  },
  delete: async ({ request, params, locals: { supabase } }) => {
    const { slug: id } = params;
    const formData = await request.formData();

    const redirectPath = String(formData.get("status"));

    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      return {
        errorMessage: error.message,
      };
    }

    const { username } = params;

    throw redirect(
      303,
      `/${username}/${redirectPath !== "reading" ? redirectPath : ""}`
    );
  },
};
