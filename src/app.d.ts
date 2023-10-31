import { Database } from "$lib/types/supabase";
import { Session, SupabaseClient } from "@supabase/supabase-js";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }
    // interface Error {}
    // interface Platform {}
  }
}
