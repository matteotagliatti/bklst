<script lang="ts">
  import { goto } from "$app/navigation";
  import BackIcon from "$lib/components/BackIcon.svelte";
  import CreateEdit from "$lib/components/CreateEdit.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import LoaderIcon from "$lib/components/LoaderIcon.svelte";
  import Title from "$lib/components/Title.svelte";
  import type { Book } from "$lib/types/index";

  export let form;

  export let data;
  const { supabase, session, id, username } = data;

  let book: Book;

  async function fetchBook() {
    if (!session) {
      goto("/");
      return;
    }

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .eq("owner", session.user.id)
      .single();

    if (error) {
      console.log(error);
      goto("/");
      return;
    }

    book = data;
  }

  function setStatusLink(status: string) {
    switch (status) {
      case "read":
        return "read";
      case "reading":
        return "";
      case "to-read":
        return "to-read";
      default:
        return "";
    }
  }
</script>

<Layout small={true}>
  <BackIcon
    href={book ? `/${username}/${setStatusLink(book.status)}` : `/${username}`}
  />
  <Title title="Edit" description="Edit the book infos below." />
  {#await fetchBook()}
    <Loader />
  {:then}
    <CreateEdit {book} {form} edit={true}>
      <svelte:fragment let:loading>
        <a
          href="#modal"
          class="flex h-[2.4rem] w-[5.5rem] items-center justify-center rounded-md border border-red-500 bg-red-500 px-5 py-2 text-sm text-white hover:cursor-pointer hover:border-red-600 hover:bg-red-600"
        >
          <span>Delete</span>
        </a>
        <div
          id="modal"
          role="dialog"
          class="fixed bottom-0 left-0 right-0 top-0 z-10 hidden items-center justify-center bg-neutral-300 bg-opacity-50 backdrop-blur target:flex"
        >
          <div class="w-80 rounded-md bg-white shadow">
            <div
              class="flex items-center justify-between rounded-t-md bg-neutral-100 px-2 py-1"
            >
              <small class="text-neutral-500">Delete</small>
              <!-- svelte-ignore a11y-invalid-attribute -->
              <!-- svelte-ignore a11y-missing-content -->
              <a href="#" class="h-3 w-3 rounded-full bg-neutral-300" />
            </div>
            <div class="p-8">
              <div class="mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mb-4 h-6 w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
                    d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"
                  /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path
                    d="M3 6l0 13"
                  /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg
                >
                <p class="text-sm">Are you sure?</p>
                <p class="text-sm text-neutral-400">
                  Click on delete to confirm.
                </p>
              </div>
              <div class="flex gap-2">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a
                  href="#"
                  class="w-full rounded-md border border-neutral-200 px-5 py-2 text-center text-sm hover:cursor-pointer hover:border-neutral-300"
                >
                  Cancel
                </a>
                <button
                  class="flex w-full items-center justify-center gap-2 rounded-md border border-red-500 bg-red-500 px-5 py-2 text-center text-sm text-white hover:cursor-pointer hover:border-red-600 hover:bg-red-600"
                  formaction="?/delete"
                >
                  {#if loading}
                    <LoaderIcon />
                  {:else}
                    Delete
                  {/if}
                </button>
              </div>
            </div>
          </div>
        </div>
      </svelte:fragment>
    </CreateEdit>
  {:catch error}
    <p class="text-red-500">{error.message}</p>
  {/await}
</Layout>
