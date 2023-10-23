<script lang="ts">
  export let htmlFor: string;
</script>

<label class="w-28 shrink-0 text-sm text-neutral-400" for={htmlFor}>
  <slot />
</label>
