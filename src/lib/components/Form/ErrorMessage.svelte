<script lang="ts">
  import type { ZodIssue } from "zod";

  export let issues: ZodIssue[] | undefined;
  export let message: string | undefined;
</script>

<div>
  {#if issues}
    {#each issues as { message, path }}
      <p>
        {String(path[0]).charAt(0).toUpperCase() + String(path[0]).slice(1)} -
        {message}
      </p>
    {/each}
  {/if}
  {#if message}
    <p class="text-sm text-red-500">{message}</p>
  {/if}
</div>
