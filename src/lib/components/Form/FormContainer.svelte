<script lang="ts">
  export let onSubmit = () => {};
</script>

<form
  on:submit={onSubmit}
  method="post"
  class="mb-12 flex flex-col md:max-w-md"
>
  <slot />
</form>
