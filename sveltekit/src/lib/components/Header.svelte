<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data;
  const { session, supabase } = data;

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    if (browser) {
      goto("/");
    }
  }
</script>

<header
  class="fixed top-0 left-0 right-0 h-12 px-3 py-4 mx-2 flex justify-between items-center border-b border-neutral-100 bg-white/75 backdrop-blur z-10"
>
  <nav class="flex gap-4 justify-center">
    <a
      class="text-sm text-neutral-400 hover:underline {$page.route.id === '/'
        ? 'italic text-neutral-900 underline'
        : null}"
      href="/"
    >
      {session ? "Reading" : "Index"}
    </a>
    {#if session}
      <a
        class="text-sm text-neutral-400 hover:underline {$page.route.id ===
        '/read'
          ? 'italic text-neutral-900 underline'
          : null}"
        href="/read"
      >
        Read</a
      >
      <a
        class="text-sm text-neutral-400 hover:underline {$page.route.id ===
        '/to-read'
          ? 'italic text-neutral-900 underline'
          : null}"
        href="/to-read"
      >
        To Read</a
      >
    {/if}
  </nav>
  <nav class="flex gap-4 justify-center">
    {#if session}
      <a class="text-sm text-neutral-400 hover:underline" href="/search">
        Search</a
      >
      <button
        class="text-sm text-neutral-400 hover:underline"
        on:click={logout}
      >
        Logout
      </button>
    {:else}
      <a class="text-sm text-neutral-400 hover:underline" href="/signin">
        Sign In
      </a>
    {/if}
  </nav>
</header>
