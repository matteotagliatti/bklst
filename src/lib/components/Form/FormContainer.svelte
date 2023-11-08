<script lang="ts">
  import { enhance } from "$app/forms";

  export let action: string | null = null;
  export let onSubmit = (e: Event) => {};
  let loading = false;
</script>

<form
  use:enhance={() => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  }}
  on:submit={onSubmit}
  method="post"
  {action}
  class="mb-12 flex flex-col md:max-w-md"
>
  <slot />
  <slot name="submit" {loading} />
</form>
