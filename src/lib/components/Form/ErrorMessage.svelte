<script lang="ts">
  import type { ZodIssue } from "zod";

  export let issues: ZodIssue[] = [];
  export let message: string | null = null;
</script>

<div class="space-y-2">
  {#each issues as { message, path }}
    <p class="text-sm text-red-500">
      {String(path[0]).charAt(0).toUpperCase() + String(path[0]).slice(1)} -
      {message}
    </p>
  {/each}
  {#if message}
    <p class="text-sm text-red-500">{message}</p>
  {/if}
</div>
