import Link from "next/link";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Logout from "@/components/Logout";

export default async function Header() {
  const supabase = createServerComponentSupabaseClient<any>({
    headers,
    cookies,
  });
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <header className="fixed top-0 left-0 right-0 h-12 px-3 py-4 mx-2 flex justify-between items-center border-b border-neutral-100 bg-white/75 backdrop-blur z-10">
      <div className="flex gap-4">
        <Link className="text-sm underline italic" href="/">
          Index
        </Link>
        {user ? (
          <Link
            className="text-sm text-neutral-400 hover:underline"
            href="/search"
          >
            Search
          </Link>
        ) : null}
      </div>
      <nav>
        {user ? (
          <Logout />
        ) : (
          <Link
            className="text-sm text-neutral-400 hover:underline"
            href="/signin"
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
