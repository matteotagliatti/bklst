<script lang="ts">
  import { goto } from "$app/navigation";
  import Layout from "$lib/components/Layout.svelte";
  import BackIcon from "$lib/components/BackIcon.svelte";
  import Title from "$lib/components/Title.svelte";
  import CreateEdit from "$lib/components/CreateEdit.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import LoaderIcon from "$lib/components/LoaderIcon.svelte";
  export let data;
  const { supabase, session, id } = data;
  let book: any;
  let loading: boolean = false;

  async function fetchBook() {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .eq("owner", session.user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    console.log(data);

    book = data;
  }

  async function deleteBook() {
    try {
      loading = true;

      const { error } = await supabase.from("books").delete().eq("id", book.id);

      if (error) {
        console.log(error);
      }

      goto("/");
      loading = false;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<Layout small={true}>
  <BackIcon href="/" />
  <Title title="Edit" description="Edit the books infos below." />
  {#await fetchBook()}
    <Loader />
  {:then}
    <CreateEdit {book} edit={true}>
      <a
        href="#modal"
        class="mt-7 w-fit text-sm border border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-2 hover:cursor-pointer"
      >
        <span>Delete</span>
      </a>
      <div
        id="modal"
        role="dialog"
        class="hidden target:flex fixed top-0 right-0 bottom-0 left-0 items-center justify-center bg-neutral-300 bg-opacity-50 z-10 backdrop-blur"
      >
        <div class="w-80 bg-white rounded-md shadow">
          <div
            class="flex justify-between items-center py-1 px-2 bg-neutral-100 rounded-t-md"
          >
            <small class="text-neutral-500">Delete</small>
            <a href="#" class="bg-neutral-300 w-3 h-3 rounded-full" />
          </div>
          <div class="p-8">
            <div class="mb-8">
              <svg
                class="w-5 h-5 mb-4"
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
              <p class="text-sm text-neutral-400">
                Click on delete to confirm.
              </p>
            </div>
            <div class="flex gap-2">
              <a
                href="#"
                class="w-full text-sm text-center border border-neutral-200 hover:border-neutral-300 rounded-md px-5 py-2 hover:cursor-pointer"
              >
                Cancel
              </a>
              <button
                class="w-full text-sm text-center border border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white rounded-md px-5 py-2 hover:cursor-pointer flex items-center justify-center gap-2"
                on:click|preventDefault={(e) => deleteBook(e)}
              >
                {#if loading}
                  <LoaderIcon />
                {/if}
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </CreateEdit>
  {:catch error}
    <p class="text-red-500">{error.message}</p>
  {/await}
</Layout>
