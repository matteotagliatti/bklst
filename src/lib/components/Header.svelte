<script lang="ts">
  import { page } from "$app/stores";
  import type { Session } from "@supabase/supabase-js";

  export let session: Session | null;
</script>

<header
  class="fixed left-0 right-0 top-0 z-10 mx-2 flex h-12 items-center justify-between border-b border-neutral-100 bg-white/75 px-3 py-4 backdrop-blur"
>
  <nav class="flex justify-center gap-4">
    <a
      class="text-sm text-neutral-400 hover:underline {$page.route.id === '/'
        ? 'italic text-neutral-900 underline'
        : ''}"
      href="/"
    >
      {session ? "Reading" : "Index"}
    </a>
    {#if session}
      <a
        class="text-sm text-neutral-400 hover:underline {$page.route.id ===
        '/read'
          ? 'italic text-neutral-900 underline'
          : ''}"
        href="/read"
      >
        Read</a
      >
      <a
        class="text-sm text-neutral-400 hover:underline {$page.route.id ===
        '/to-read'
          ? 'italic text-neutral-900 underline'
          : ''}"
        href="/to-read"
      >
        To Read</a
      >
    {/if}
  </nav>
  <nav class="flex justify-center gap-4">
    {#if session}
      <a class="text-sm text-neutral-400 hover:underline" href="/search">
        Search</a
      >
      <form
        method="post"
        class="text-sm text-neutral-400 hover:underline"
        action="/logout"
      >
        <button>Logout</button>
      </form>
    {:else}
      <a class="text-sm text-neutral-400 hover:underline" href="/signin">
        Sign In
      </a>
    {/if}
  </nav>
</header>
