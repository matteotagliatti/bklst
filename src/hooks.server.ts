import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createServerClient } from "@supabase/ssr";
import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, options);
        },
        remove: (key, options) => {
          event.cookies.delete(key, options);
        },
      },
    }
  );

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  const url = event.url.pathname;

  if (url !== "/signin" && url !== "/signin/password-recover" && url !== "/") {
    const session = await event.locals.getSession();
    if (!session) {
      throw redirect(303, "/");
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
