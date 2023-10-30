<script lang="ts">
  import { page } from "$app/stores";
  import BackIcon from "$lib/components/BackIcon.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";
</script>

<Layout>
  <BackIcon />
  <Title
    title={String($page.status)}
    description={$page.error ? $page.error.message : "Unspecified error"}
  />
</Layout>
