import Link from "next/link";
import { useRouter } from "next/router";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Header() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  function logout() {
    supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-12 px-3 py-4 mx-2 flex justify-between items-center border-b border-neutral-100 bg-white/75 backdrop-blur z-10">
      <div className="flex gap-4">
        <Link className="text-sm underline italic" href="/">
          Index
        </Link>
        {user ? (
          <>
            <Link
              className="text-sm text-neutral-400 hover:underline"
              href="/search"
            >
              Search
            </Link>

            <div className="relative group">
              <p className="text-sm text-neutral-400 hover:underline cursor-pointer">
                Categories
              </p>
              <div className="text-neutral-400 hidden absolute top-5 left-0 group-hover:flex flex-col gap-2 rounded bg-white p-2 shadow">
                <Link href={"/read"} className="text-sm hover:underline">
                  Read
                </Link>
                <Link href={"/reading"} className="text-sm hover:underline">
                  Reading
                </Link>
                <Link href={"/to-read"} className="text-sm hover:underline">
                  To Read
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <nav>
        {user ? (
          <button
            className="text-sm text-neutral-400 hover:underline"
            onClick={() => logout()}
          >
            Logout
          </button>
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
