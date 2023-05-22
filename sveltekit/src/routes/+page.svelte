<script>
  import Layout from "$lib/components/Layout.svelte";
  import Header from "$lib/components/Header.svelte";
  import BooksContainer from "$lib/components/BooksContainer.svelte";
  import Book from "$lib/components/Book.svelte";
  import Title from "$lib/components/Title.svelte";
  export let data;
  const { session } = data;
  let { books } = data;

  $: books = books?.slice(0, 8);
  books?.sort((a, b) => {
    if (a.status === "reading" && b.status !== "reading") return -1;
    if (a.status === "to-read" && b.status === "read") return -1;
    if (a.status === "to-read" && b.status === "reading") return 1;
    if (a.status === "read" && b.status !== "read") return 1;
    return 0;
  });
</script>

<Layout>
  <Header {data} />
  {#if session}
    {#if books?.length === 0}
      <div
        class="absolute bottom-7 right-0 left-0 lg:bottom-auto flex justify-center"
      >
        <a
          href="/search"
          class="w-fit h-fit text-sm border border-neutral-200 hover:border-neutral-300 rounded-md px-5 py-2 hover:cursor-pointer"
        >
          Add your first book
        </a>
      </div>
    {:else}
      <Title title={"Books"} description={"All your books."} />
      <BooksContainer>
        {#each books as book}
          <Book {book} status={true} />
        {/each}
      </BooksContainer>
    {/if}
  {:else}
    <div class="md:max-w-md mb-10 md:mt-10">
      <h1 class="text-4xl mb-2">
        Your <span class="italic">simple</span> and
        <br /> <span class="italic">personal</span> booklist
      </h1>
      <p class="text-sm text-neutral-400 mb-5">
        A very simple way to keep track of the books you read. No social media
        functions, no ads, no tracking. Just you and your books in a very clean
        interface. Forever{" "}
        <a
          class="underline"
          target="_blank"
          href="https://github.com/matteotagliatti/bklst"
        >
          open source
        </a>
        .
      </p>
      <a
        href="mailto:matteotagliatti@gmail.com?subject=Request to join Bklst&body=Hello, I'd love to join Bklst."
        class="text-sm flex items-center border border-neutral-200 hover:border-neutral-300 rounded-full px-2 py-1 w-fit gap-2"
        target="_blank"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66667 6L8 8.33333L11.3333 6"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.33333 11.3333V4.66667C1.33333 3.93029 1.93028 3.33334 2.66666 3.33334H13.3333C14.0697 3.33334 14.6667 3.93029 14.6667 4.66667V11.3333C14.6667 12.0697 14.0697 12.6667 13.3333 12.6667H2.66666C1.93028 12.6667 1.33333 12.0697 1.33333 11.3333Z"
            stroke="black"
            stroke-width="1.2"
          />
        </svg>
        Request an invite
      </a>
    </div>
    <BooksContainer>
      <Book
        book={{
          title: "East of Eden",
          author: "John Steinbeck",
          img: "http://books.google.com/books/content?id=OPy6E5ZhXs0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          status: "read",
          finished: "2023-07-22",
        }}
      />
      <Book
        book={{
          title: "Sapiens",
          author: "Yuval Noah Harari",
          img: "http://books.google.com/books/content?id=1EiJAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          status: "reading",
        }}
      />
      <Book
        book={{
          title: "Stories of Breece D'J Pancake",
          author: "Breece D'J Pancake",
          img: "http://books.google.com/books/content?id=jWs5AQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          status: "to-read",
        }}
      />
      <Book
        book={{
          title: "Slaughterhouse-Five",
          author: "Kurt Vonnegut",
          img: "http://books.google.com/books/content?id=DLCSm6whrnEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          status: "to-read",
        }}
      />
      <Book
        book={{
          title: "Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          img: "http://books.google.com/books/content?id=xFr92V2k3PIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          status: "reading",
        }}
      />
      <Book
        book={{
          title: "Fire & Blood",
          author: "George R.R. Martin",
          img: "http://books.google.com/books/content?id=Mj5XDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          status: "read",
          finished: "2023-03-21",
        }}
      />
    </BooksContainer>
  {/if}
</Layout>
