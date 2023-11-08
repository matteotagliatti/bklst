<script lang="ts">
  import type { ZodIssue } from "zod";

  export let issues: ZodIssue[] | undefined = undefined;
  export let message: string | undefined = undefined;
</script>

<div class="space-y-2">
  {#if issues}
    {#each issues as { message, path }}
      <p class="text-red-500 text-sm">
        {String(path[0]).charAt(0).toUpperCase() + String(path[0]).slice(1)} -
        {message}
      </p>
    {/each}
  {/if}

  {#if message}
    <p class="text-red-500 text-sm">{message}</p>
  {/if}
</div>
