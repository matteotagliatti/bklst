<script lang="ts">
  import type { ActionData } from "./$types";

  import BackIcon from "$lib/components/BackIcon.svelte";
  import CreateEdit from "$lib/components/CreateEdit.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";

  export let form: ActionData;
  export let data;
  const { book } = data;
</script>

<Layout small={true}>
  <BackIcon href="/search" />
  <Title title="Add a book" description="You can edit the infos below." />
  <CreateEdit {form} {book} />
</Layout>
