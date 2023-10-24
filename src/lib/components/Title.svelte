<script lang="ts">
  export let title: string;
  export let description: string;
  export let mb = "mb-1";
</script>

<div class="flex max-w-xs flex-row items-end justify-between gap-2 pb-4">
  <div>
    <h2 class="text-2xl {mb}">{title}</h2>
    <p class="text-sm text-neutral-400">{description}</p>
  </div>
</div>
