<script lang="ts">
  export let title: string;
  export let description: string;
  export let mb = "mb-1";
</script>

<div class="max-w-xs pb-4">
  <h2 class="text-2xl {mb}">{title}</h2>
  <p class="text-sm text-neutral-400">{description}</p>
</div>
