<script lang="ts">
  export let href: string;
</script>

<a {href} class="cursor-pointer">
  <slot />
</a>
