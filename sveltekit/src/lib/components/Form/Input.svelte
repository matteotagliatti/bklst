<script lang="ts">
	export let type: string = 'text';
	export let required: boolean = true;
	export let placeholder: string = '';
	export let value: string = '';
	export let onChange = () => {};

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
	};
</script>

<input
	class="shrink grow border-none p-0 text-sm focus-within:ring-0 focus:outline-none focus:ring-0"
	{type}
	{required}
	{placeholder}
	{value}
	on:change|preventDefault={onChange}
	on:input={handleInput}
/>
