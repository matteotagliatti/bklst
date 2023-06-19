<script lang="ts">
	export let id: string | undefined;
	export let checked: boolean;
	export let disabled: boolean | undefined = false;
</script>

<div class="flex">
	<input
		{disabled}
		{id}
		class="relative peer appearance-none shrink-0 w-4 h-4"
		type="checkbox"
		bind:checked
	/>
	<svg
		class="absolute w-4 h-4 pointer-events-none stroke-red-500 fill-none peer-checked:!fill-red-500"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/>
	</svg>
</div>
