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
  <Header {session} />
  {#if books?.length === 0}
    <div
      class="absolute bottom-7 left-0 right-0 flex justify-center lg:bottom-auto"
    >
      <a
        href="/search"
        class="h-fit w-fit rounded-md border border-neutral-200 px-5 py-2 text-sm hover:cursor-pointer hover:border-neutral-300"
      >
        Add a book you're reading
      </a>
    </div>
  {:else}
    <Title
      mb="mb-0"
      title="Reading"
      description="Books I'm currently reading."
    />
    {#if books}
      <BooksContainer>
        {#each books as book}
          <BookLink href="/book/{book.id}">
            <Book {book} />
          </BookLink>
        {/each}
      </BooksContainer>
    {/if}
  {/if}
</Layout>
