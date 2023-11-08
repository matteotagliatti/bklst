<script lang="ts">
  import { goto } from "$app/navigation";
  import CreateEdit from "$lib/components/CreateEdit.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import LoaderIcon from "$lib/components/LoaderIcon.svelte";
  import Title from "$lib/components/Title.svelte";
  import type { Book } from "$lib/types/index";

  export let form;

  export let data;
  const { supabase, session, id } = data;

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

  function goBack() {
    window.history.back();
  }
</script>

<Layout small={true}>
  <button on:click={goBack} class="mb-5 block">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3L2 7L6 11"
        stroke="#A3A3A3"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 7H9.2C11.8509 7 14 9.23863 14 12"
        stroke="#A3A3A3"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <Title title="Edit" description="Edit the book infos below." />
  {#await fetchBook()}
    <Loader />
  {:then}
    <CreateEdit {book} {form} edit={true}>
      <svelte:fragment let:loading>
        <a
          href="#modal"
          class="flex h-[2.4rem] w-[5.5rem] items-center justify-center rounded-md border border-red-500 bg-red-500 px-5 py-2 text-white text-sm hover:cursor-pointer hover:border-red-600 hover:bg-red-600"
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
                  class="mb-4 h-5 w-5"
                  viewBox="0 0 60 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M59.1667 67.3332H51.5487L32.9465 48.731C31.3193 47.1039 28.6811 47.1039 27.0539 48.731L8.45178 67.3332L0.833328 67.3333V3.66667C0.833328 2.00982 2.17647 0.666672 3.83333 0.666672H56.1667C57.8235 0.666672 59.1667 2.00982 59.1667 3.66667V67.3332Z"
                    fill="black"
                  />
                </svg>
                <p class="text-sm">Are you sure?</p>
                <p class="text-neutral-400 text-sm">
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
                  class="flex w-full items-center justify-center gap-2 rounded-md border border-red-500 bg-red-500 px-5 py-2 text-center text-white text-sm hover:cursor-pointer hover:border-red-600 hover:bg-red-600"
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
