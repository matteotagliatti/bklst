<script lang="ts">
	export let onSubmit = () => {};
</script>

<form on:submit|preventDefault={onSubmit} class="flex flex-col md:max-w-md mb-12">
	<slot />
</form>
