<script lang="ts">
	import LoaderIcon from '$lib/components/LoaderIcon.svelte';

	export let value: string = '';
	export let loading: boolean = false;
</script>

<button
	type="submit"
	class="mt-7 w-fit text-sm border border-neutral-200 hover:border-neutral-300 rounded-md px-5 py-2 hover:cursor-pointer flex gap-2 items-center"
>
	{#if loading}
		<LoaderIcon />
	{/if}
	{value}
</button>
