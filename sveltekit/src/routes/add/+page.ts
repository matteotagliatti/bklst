import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (({ url }) => {
  if (url.searchParams) {
    const title = url.searchParams.get("title");
    const author = url.searchParams.get("author");
    const img = url.searchParams.get("img");

    return {
      book: {
        title,
        author,
        img,
      },
    };
  }

  throw error(404, "Not found");
}) satisfies PageLoad;
