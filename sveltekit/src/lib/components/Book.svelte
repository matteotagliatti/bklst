<script lang="ts">
  import type { BookType } from "$lib/types";
  export let book: BookType;
  export let status: boolean = false;

  function formatDate(string: string) {
    return string.replace(/ .*/, "").slice(2);
  }
</script>

<div
  class="relative md:h-96 bg-neutral-100 flex gap-5 items-center justify-start md:justify-center p-4 md:p-2 rounded-lg hover:bg-[#EEEEF0] transition-colors group"
>
  <img
    class="h-36 md:h-56 lg:h-60 object-cover w-24 md:w-36 lg:w-40 group-hover:-translate-y-1 transition-transform ease-in-out shadow-lg drop-shadow-lg"
    src={book.img}
    alt={book.title}
  />
  <div
    class="md:absolute md:bottom-3 md:left-3 md:right-3 flex justify-between items-end"
  >
    <div>
      <small class="block text-neutral-400">{book.author}</small>
      <p class="text-sm line-clamp-2 md:line-clamp-1">{book.title}</p>
    </div>
    <div
      class="absolute bottom-3 left-3 right-3 md:relative md:bottom-0 md:left-0 md:right-0 text-neutral-400 text-right"
    >
      {#if status}
        <small class="block text-sm">{book.status}</small>
      {/if}
      {#if book.status === "read" && book.finished}
        <small class="block">{formatDate(book.finished)}</small>
      {/if}
    </div>
  </div>
</div>
