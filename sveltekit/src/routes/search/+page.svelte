<script lang="ts">
  import Layout from "$lib/components/Layout.svelte";
  import BackIcon from "$lib/components/BackIcon.svelte";
  import Title from "$lib/components/Title.svelte";
  import FormContainer from "$lib/components/Form/FormContainer.svelte";
  import InputContainer from "$lib/components/Form/InputContainer.svelte";
  import Label from "$lib/components/Form/Label.svelte";
  import Input from "$lib/components/Form/Input.svelte";
  import Submit from "$lib/components/Form/Submit.svelte";
  import BooksContainer from "$lib/components/BooksContainer.svelte";
  import Book from "$lib/components/Book.svelte";
  import searchBooks from "$lib/functions/search";
  import type { BookType } from "$lib/types";
  import { PUBLIC_GOOGLE_API_KEY } from "$env/static/public";

  let books = [] as BookType[];
  let loading = false;
  let noBooksMsg = false;
  let inputValues = {
    title: "",
    author: "",
    isbn: "",
  };

  async function fetchBooks() {
    try {
      loading = true;

      if (
        inputValues.title === "" &&
        inputValues.author === "" &&
        inputValues.isbn === ""
      ) {
        alert("Complete at least one field.");
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
        noBooksMsg = true;
        return;
      }

      res.data.items = res.data.items.slice(0, 6);

      books = res.data.items.map((book: any) => {
        const title = book.volumeInfo.title;
        const author = book.volumeInfo.authors
          ? book.volumeInfo.authors[0]
          : "Unknown";
        const img = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : "https://via.placeholder.com/150x150/e6e6e6/969696?text=No+Cover+Avaiable";
        return {
          title,
          author,
          img,
        };
      });

      loading = false;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<Layout small={true}>
  <BackIcon href="/" />
  <Title
    title="Search"
    description="Search for a book and add it to your booklist. Complete at least one field."
  />
  <FormContainer onSubmit={fetchBooks}>
    <InputContainer>
      <Label htmlFor="title">Title</Label>
      <Input
        required={false}
        type="text"
        placeholder="Game of Thrones"
        bind:value={inputValues.title}
      />
    </InputContainer>
    <InputContainer>
      <Label htmlFor="author">Author</Label>
      <Input
        required={false}
        type="text"
        placeholder="George R.R. Martin"
        bind:value={inputValues.author}
      />
    </InputContainer>
    <InputContainer>
      <Label htmlFor="isbn">ISBN</Label>
      <Input
        required={false}
        type="text"
        placeholder="880475172X"
        bind:value={inputValues.isbn}
      />
    </InputContainer>
    <Submit value={"Search"} bind:loading />
  </FormContainer>
  <BooksContainer cols={2}>
    {#if noBooksMsg}
      <p class="text-sm">No books found! Do another search.</p>
    {:else}
      {#each books as book}
        <Book {book} />
      {/each}
    {/if}
  </BooksContainer>
</Layout>
