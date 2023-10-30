import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (({ url }) => {
  if (url.searchParams) {
    const title = url.searchParams.get("title");
    const author = url.searchParams.get("author");
    const img = url.searchParams.get("img");
    const owner = url.searchParams.get("owner");

    if (!title || !author || !img || !owner) {
      throw error(404, "Invalid request");
    }

    return {
      book: {
        title,
        author,
        img,
        favorite: false,
        status: "to-read",
        owner,
      },
    };
  }

  throw error(404, "Invalid request");
}) satisfies PageLoad;
