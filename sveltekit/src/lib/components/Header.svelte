<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
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
  <nav class="flex gap-4">
    <a class="text-sm underline italic" href="/"> Index </a>
    {#if session}
      <a class="text-sm text-neutral-400 hover:underline" href="/search">
        Search</a
      >
    {/if}
  </nav>
  <nav>
    {#if session}
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

{#if session}
  <nav
    class="z-10 fixed bottom-4 md:bottom-7 right-0 left-0 flex justify-center"
  >
    <div
      class="flex gap-5 bg-white px-3 py-2 rounded shadow border border-neutral-100 bg-white/75 backdrop-blur z-10"
    >
      <a href="/read" class="text-sm">Read</a>
      <div class="w-[1px] h-full bg-neutral-200" />
      <a href="/to-read" class="text-sm">To Read</a>
    </div>
  </nav>
{/if}
