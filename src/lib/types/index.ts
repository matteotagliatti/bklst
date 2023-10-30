import type { Database } from "./supabase";

export type Book = Database["public"]["Tables"]["books"]["Row"];
export type BookInsert = Database["public"]["Tables"]["books"]["Insert"];
export type BookUpdate = Database["public"]["Tables"]["books"]["Update"];
