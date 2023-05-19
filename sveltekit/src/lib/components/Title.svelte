<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="flex flex-row pb-4 gap-2 justify-between items-end max-w-xs">
  <div>
    <h2 class="text-2xl mb-1">{title}</h2>
    <p class="text-sm text-neutral-400">{description}</p>
  </div>
</div>
