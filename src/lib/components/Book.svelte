<script lang="ts">
  import type { BookType } from "../types";
  import Hearth from "./Form/Hearth.svelte";

  export let book: BookType;
  export let status: boolean = false;

  function formatDate(string: string) {
    return string.replace(/ .*/, "").slice(2);
  }
</script>

<div
  class="group relative flex items-center justify-start gap-5 rounded-lg bg-neutral-100 p-4 transition-colors hover:bg-[#EEEEF0] md:h-96 md:justify-center md:p-2"
>
  {#if book.favorite}
    <div class="absolute right-3 top-3">
      <Hearth disabled={true} id="favorite" bind:checked={book.favorite} />
    </div>
  {/if}

  <img
    class="h-36 w-24 object-cover shadow-lg drop-shadow-lg transition-transform ease-in-out group-hover:-translate-y-1 md:h-56 md:w-36 lg:h-60 lg:w-40"
    src={book.img}
    alt={book.title}
  />
  <div
    class="flex items-end justify-between md:absolute md:bottom-3 md:left-3 md:right-3"
  >
    <div>
      <small class="block text-neutral-400">{book.author}</small>
      <p class="line-clamp-2 text-sm md:line-clamp-1">{book.title}</p>
    </div>
    <div
      class="absolute bottom-3 left-3 right-3 text-right text-neutral-400 md:relative md:bottom-0 md:left-0 md:right-0"
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
