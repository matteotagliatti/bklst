<script lang="ts">
  import { goto } from "$app/navigation";
  import BackIcon from "$lib/components/BackIcon.svelte";
  import CreateEdit from "$lib/components/CreateEdit.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import LoaderIcon from "$lib/components/LoaderIcon.svelte";
  import Title from "$lib/components/Title.svelte";
  export let data;
  const { supabase, session, id } = data;
  let book: any;
  let loading: boolean = false;
  let href: string = "/";

  async function fetchBook() {
    if (!session) {
      goto("/login");
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
      return;
    }

    if (data.status !== "reading") href = `/${data.status}`;
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
  <BackIcon {href} />
  <Title title="Edit" description="Edit the books infos below." />
  {#await fetchBook()}
    <Loader />
  {:then}
    <CreateEdit {supabase} {session} {book} edit={true}>
      <a
        href="#modal"
        class="w-fit rounded-md border border-red-500 bg-red-500 px-5 py-2 text-sm text-white hover:cursor-pointer hover:border-red-600 hover:bg-red-600"
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
                on:click|preventDefault={deleteBook}
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
