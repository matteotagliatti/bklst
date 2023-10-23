<script lang="ts">
  export let onSubmit = (e: Event) => {};
</script>

<form
  on:submit={onSubmit}
  method="post"
  class="mb-12 flex flex-col md:max-w-md"
>
  <slot />
</form>
