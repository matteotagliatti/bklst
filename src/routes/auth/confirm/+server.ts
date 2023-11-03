import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "../../$types";

/**
 *
 * @param event
 * @description API Endoint for confirming email OTP, useful for  Magic Link and Password Recovery
 */
export const GET = async (event: RequestEvent) => {
  const {
    url,
    locals: { supabase },
  } = event;
  const token_hash = url.searchParams.get("token_hash") as string;
  const type = (url.searchParams.get("type") as EmailOtpType) || null;

  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      const session = data.session;

      if (!session) {
        throw new Error("No session");
      }

      const { data: user, error } = await supabase
        .from("users")
        .select()
        .eq("id", session.user.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      throw redirect(303, `/${user.username}`);
    }
  }

  throw new Error("Invalid token");
};
