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
	class="text-sm shrink grow"
	{type}
	{required}
	{placeholder}
	{value}
	on:change|preventDefault={onChange}
	on:input={handleInput}
/>
