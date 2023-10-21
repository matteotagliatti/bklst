<script lang="ts">
  import BackIcon from "$lib/components/BackIcon.svelte";
  import CreateEdit from "$lib/components/CreateEdit.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";
  export let data;
  const { book, supabase, session } = data;
</script>

<Layout small={true}>
  <BackIcon href="/search" />
  <Title title="Add a book" description="You can edit the infos below." />
  <CreateEdit {book} {supabase} {session} />
</Layout>
