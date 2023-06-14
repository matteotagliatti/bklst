<script lang="ts">
  import BooksContainer from "$lib/components/BooksContainer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";
  import Book from "$lib/components/Book.svelte";
  import BookLink from "$lib/components/BookLink.svelte";
  export let data;
  const { books } = data;
</script>

<Layout>
  <Header {data} />
  <Title title="To Read" description="Books to read in the future." />
  <BooksContainer>
    {#each books as book}
      <BookLink href="/book/{book.id}">
        <Book {book} />
      </BookLink>
    {/each}
  </BooksContainer>
</Layout>
