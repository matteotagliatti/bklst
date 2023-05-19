<script lang="ts">
  import Header from "./Header.svelte";

  export let small: boolean = false;
  let classNames = "mx-auto px-5 py-20 lg:px-20 lg:py-20";
  if (small) classNames = "mx-auto p-5 lg:w-[800px] lg:px-0 lg:py-20";
</script>

<main class={classNames}>
  <slot />
</main>
