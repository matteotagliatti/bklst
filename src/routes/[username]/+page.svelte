<script lang="ts">
  import Book from "$lib/components/Book.svelte";
  import BookLink from "$lib/components/BookLink.svelte";
  import BooksContainer from "$lib/components/BooksContainer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";
  export let data;
  const { session, books, username } = data;
</script>

<Layout>
  <Header {session} {username} />
  <Title mb="mb-0" title="Reading" description="Books I'm currently reading." />
  {#if books}
    <BooksContainer>
      {#each books as book}
        {#if session}
          <BookLink href="/{username}/book/{book.id}">
            <Book {book} />
          </BookLink>
        {:else}
          <Book {book} />
        {/if}
      {/each}
    </BooksContainer>
  {/if}
</Layout>
