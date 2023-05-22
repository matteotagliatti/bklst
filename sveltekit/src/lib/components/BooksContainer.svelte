<script lang="ts">
  export let cols: number = 3;
  let gridCols = "md:grid-cols-3";
  if (cols === 2) gridCols = "md:grid-cols-2";
  const classNames = `grid grid-cols-1 ${gridCols} gap-4`;
</script>

<div class={classNames}><slot /></div>
