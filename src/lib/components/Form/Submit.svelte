<script lang="ts">
  import LoaderIcon from "$lib/components/LoaderIcon.svelte";

  export let value: string = "";
  export let loading: boolean = false;
</script>

<button
  type="submit"
  class="flex h-[2.4rem] w-[5.5rem] shrink-0 items-center justify-center gap-2 self-start rounded-md border border-neutral-200 text-sm hover:cursor-pointer hover:border-neutral-300"
>
  {#if loading}
    <LoaderIcon />
  {:else}
    {value}
  {/if}
</button>
