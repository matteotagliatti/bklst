<script lang="ts">
  export let action: string | null = null;
  export let onSubmit = (e: Event) => {};
</script>

<form
  on:submit={onSubmit}
  method="post"
  {action}
  class="mb-12 flex flex-col md:max-w-md"
>
  <slot />
</form>
