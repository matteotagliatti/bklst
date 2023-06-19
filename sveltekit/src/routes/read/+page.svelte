<script lang="ts">
  import Book from "$lib/components/Book.svelte";
  import BookLink from "$lib/components/BookLink.svelte";
  import BooksContainer from "$lib/components/BooksContainer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";
  export let data;
  const { session, books } = data;
</script>

<Layout>
  <Header {session} {data} />
  <Title title="Read" description="The last books I've read." />
  <BooksContainer>
    {#each books as book}
      <BookLink href="/book/{book.id}">
        <Book {book} />
      </BookLink>
    {/each}
  </BooksContainer>
</Layout>
