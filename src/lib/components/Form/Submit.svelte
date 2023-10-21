<script lang="ts">
  import LoaderIcon from "$lib/components/LoaderIcon.svelte";

  export let value: string = "";
  export let loading: boolean = false;
</script>

<button
  type="submit"
  class="flex w-fit shrink-0 items-center gap-2 self-start rounded-md border border-neutral-200 px-5 py-2 text-sm hover:cursor-pointer hover:border-neutral-300"
>
  {#if loading}
    <LoaderIcon />
  {/if}
  {value}
</button>
