<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import "../app.css";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (event, _session) => {
        if (_session?.expires_at !== session?.expires_at) {
          invalidate("supabase:auth");
        }
      }
    );

    return () => data.subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>bklst</title>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1"
  />
</svelte:head>

<div class="app">
  <slot />
</div>
