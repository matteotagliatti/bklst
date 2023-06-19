<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import BackIcon from '$lib/components/BackIcon.svelte';
	import Title from '$lib/components/Title.svelte';
	import CreateEdit from '$lib/components/CreateEdit.svelte';
	export let data;
	const { book, supabase, session }: any = data;
</script>

<Layout small={true}>
	<BackIcon href="/search" />
	<Title title="Add a book" description="You can edit the infos below." />
	<CreateEdit {book} {supabase} {session} />
</Layout>
