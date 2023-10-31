<script lang="ts">
  import { PUBLIC_GOOGLE_API_KEY } from "$env/static/public";
  import BackIcon from "$lib/components/BackIcon.svelte";
  import Book from "$lib/components/Book.svelte";
  import BookLink from "$lib/components/BookLink.svelte";
  import BooksContainer from "$lib/components/BooksContainer.svelte";
  import ErrorMessage from "$lib/components/Form/ErrorMessage.svelte";
  import FormContainer from "$lib/components/Form/FormContainer.svelte";
  import Input from "$lib/components/Form/Input.svelte";
  import Submit from "$lib/components/Form/Submit.svelte";
  import SubmitContainer from "$lib/components/Form/SubmitContainer.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";
  import searchBooks from "$lib/functions/search";
  import type { BookInsert } from "$lib/types/index";

  export let data;

  const { session } = data;

  let books = [] as BookInsert[];
  let loading = false;
  let errorMessage: string | null = null;

  interface Values {
    title: string | null;
    author: string | null;
    isbn: string | null;
  }

  let inputValues: Values = {
    title: null,
    author: null,
    isbn: null,
  };

  async function fetchBooks(event: Event) {
    try {
      event.preventDefault();
      loading = true;
      errorMessage = null;

      if (!inputValues.title && !inputValues.author && !inputValues.isbn) {
        errorMessage = "Complete at least one field.";
        loading = false;
        return;
      }

      const res = await searchBooks(
        PUBLIC_GOOGLE_API_KEY,
        inputValues.title,
        inputValues.author,
        inputValues.isbn
      );

      if (res.data.totalItems === 0) {
        loading = false;
        errorMessage = "No books found.";
        unblurAllInputs();
        return;
      }

      unblurAllInputs();

      res.data.items = res.data.items.slice(0, 6);

      books = res.data.items.map((book: any) => {
        return {
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors
            ? book.volumeInfo.authors[0]
            : "Unknown",
          img: book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : "https://via.placeholder.com/150x150/e6e6e6/969696?text=No+Cover+Avaiable",
        };
      });

      loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  function unblurAllInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => input.blur());
  }
</script>

<Layout small={true}>
  <BackIcon />
  <Title
    title="Search"
    description="Search for a book and add it to your booklist. Complete at least one field."
  />
  <FormContainer onSubmit={fetchBooks}>
    <Input
      id="title"
      label="Title"
      required={false}
      type="text"
      placeholder="Game of Thrones"
      bind:value={inputValues.title}
    />
    <Input
      id="author"
      label="Author"
      required={false}
      type="text"
      placeholder="George R.R. Martin"
      bind:value={inputValues.author}
    />
    <Input
      id="isbn"
      label="ISBN"
      required={false}
      type="text"
      placeholder="880475172X"
      bind:value={inputValues.isbn}
    />
    <SubmitContainer>
      <Submit value={"Search"} bind:loading />
      {#if errorMessage}
        <ErrorMessage message={errorMessage} />
      {/if}
    </SubmitContainer>
  </FormContainer>
  <BooksContainer cols={2}>
    {#each books as book}
      <BookLink
        href="add?title={book.title}&author={book.author}&img={book.img
          .replace(/:/g, '%3A')
          .replace(/\?/g, '%3F')
          .replace(/=/g, '%3D')
          .replace(/&/g, '%26')}&owner={session?.user.id}"
      >
        <Book {book} />
      </BookLink>
    {/each}
  </BooksContainer>
</Layout>
