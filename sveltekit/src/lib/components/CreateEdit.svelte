<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BookType } from '$lib/types';
	import FormContainer from './Form/FormContainer.svelte';
	import Hearth from './Form/Hearth.svelte';
	import Input from './Form/Input.svelte';
	import InputContainer from './Form/InputContainer.svelte';
	import Label from './Form/Label.svelte';
	import Submit from './Form/Submit.svelte';

	export let session: any;
	export let supabase: any;
	export let book: BookType;
	export let edit: boolean = false;
	let loading: boolean = false;

	function handleFavorite() {
		if (book.status !== 'read') book.favorite = false;
	}

	async function updateBook() {
		try {
			loading = true;
			handleFavorite();
			if (!book.finished || book.status !== 'read') book.finished = null;

			book.updated_at = new Date().toISOString();

			const { error } = await supabase.from('books').update(book).eq('id', book.id);

			if (error) {
				console.log(error);
			}

			goto('/');
			loading = false;
		} catch (error) {
			console.log(error);
		}
	}

	async function addBook() {
		try {
			loading = true;
			handleFavorite();
			book.owner = session.user.id;
			if (!book.finished || book.status !== 'read') book.finished = null;

			const { error } = await supabase.from('books').insert(book);

			if (error) {
				console.log(error);
			}

			goto('/');
			loading = false;
		} catch (error) {
			console.log(error);
		}
	}
</script>

<FormContainer onSubmit={edit ? updateBook : addBook}>
	<div class="relative mb-2 flex items-center justify-center rounded-lg bg-neutral-100 p-10">
		<img class="w-36 shadow-lg drop-shadow-lg" src={book.img} alt={book.title} />
		<div class="absolute bottom-3 right-3">
			{#if book.status === 'read'}
				<Hearth id={book.id} bind:checked={book.favorite} />
			{/if}
		</div>
	</div>

	<InputContainer>
		<Label htmlFor="img-url">Img URL:</Label>
		<Input
			required={true}
			type="text"
			placeholder="https://example.com/image.jpg"
			bind:value={book.img}
		/>
	</InputContainer>
	<InputContainer>
		<Label htmlFor="title">Title</Label>
		<Input required={true} type="text" placeholder="Game of Thrones" bind:value={book.title} />
	</InputContainer>
	<InputContainer>
		<Label htmlFor="author">Author</Label>
		<Input required={true} type="text" placeholder="George R. R. Martin" bind:value={book.author} />
	</InputContainer>
	<InputContainer>
		<Label htmlFor="status">Status</Label>
		<select
			class="border-none py-0 pl-0 pr-8 text-sm focus-within:ring-0 focus:outline-none focus:ring-0"
			bind:value={book.status}
			on:change={() => {
				if (book.status === 'read') book.finished = new Date().toISOString().split('T')[0];
				else book.finished = null;
			}}
		>
			<option value="to-read">To Read</option>
			<option value="reading">Reading</option>
			<option value="read">Read</option>
		</select>
	</InputContainer>
	{#if book.status === 'read'}
		<InputContainer>
			<Label htmlFor="finished">Finished</Label>
			<input
				required
				type="date"
				class="border-none p-0 text-sm focus-within:ring-0 focus:outline-none focus:ring-0"
				bind:value={book.finished}
			/>
		</InputContainer>
	{/if}

	<div class="flex items-center gap-3">
		<Submit value={edit ? `Update` : `Add`} bind:loading />
		<slot />
	</div>
</FormContainer>
