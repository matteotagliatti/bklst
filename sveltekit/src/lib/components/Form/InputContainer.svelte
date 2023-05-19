<script lang="ts">
  export let hidden: boolean = false;
  let classNames = "flex items-start py-3.5 border-b border-neutral-100";
  if (hidden) {
    classNames += " hidden";
  }
</script>

<div class={classNames}><slot /></div>
