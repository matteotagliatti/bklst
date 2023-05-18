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
    <>
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
      {user ? (
        <nav className="z-10 fixed bottom-4 md:bottom-7 right-0 left-0 flex justify-center">
          <div className="flex gap-5 bg-white px-3 py-2 rounded shadow border border-neutral-100 bg-white/75 backdrop-blur z-10">
            <Link href={"/reading"} className="text-sm">
              Reading
            </Link>
            <div className="w-[1px] h-full bg-neutral-200"></div>
            <Link href={"/read"} className="text-sm">
              Read
            </Link>
            <div className="w-[1px] h-full bg-neutral-200"></div>
            <Link href={"/to-read"} className="text-sm">
              To Read
            </Link>
          </div>
        </nav>
      ) : null}
    </>
  );
}
