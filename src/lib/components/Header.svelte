<script lang="ts">
  import { page } from "$app/stores";
  import type { Session } from "@supabase/supabase-js";

  export let session: Session | null;
  export let username: string | null;
</script>

<header
  class="fixed left-0 right-0 top-0 z-10 mx-2 flex h-12 items-center justify-between border-b border-neutral-100 bg-white/75 px-3 py-4 backdrop-blur"
>
  <nav class="flex justify-center gap-4">
    <slot>
      {#if username}
        <a
          class="text-neutral-400 text-sm hover:underline {$page.route.id ===
          `/[username]`
            ? 'italic text-neutral-900 underline'
            : ''}"
          href={`/${username}/`}
        >
          Reading
        </a>
        <a
          class="text-neutral-400 text-sm hover:underline {$page.route.id ===
          `/[username]/read`
            ? 'italic text-neutral-900 underline'
            : ''}"
          href={`/${username}/read`}
        >
          Read</a
        >
        <a
          class="text-neutral-400 text-sm hover:underline {$page.route.id ===
          `/[username]/to-read`
            ? 'italic text-neutral-900 underline'
            : ''}"
          href={`/${username}/to-read`}
        >
          To Read</a
        >
      {/if}
    </slot>
  </nav>
  <nav class="flex justify-center gap-4">
    {#if session}
      <a
        class="text-neutral-400 text-sm hover:underline"
        href={`/${username}/search`}
      >
        Search</a
      >
      <form method="post" class="text-neutral-400 text-sm" action="/logout">
        <button class="hover:underline">Logout</button>
      </form>
    {:else}
      <a class="text-neutral-400 text-sm hover:underline" href="/signin">
        Sign In
      </a>
    {/if}
  </nav>
</header>
