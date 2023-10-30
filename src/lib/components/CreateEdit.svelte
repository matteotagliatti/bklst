<script lang="ts">
  import type { BookInsert } from "$lib/types/index";
  import type { ActionData } from "../../routes/add/$types";

  import ErrorMessage from "./Form/ErrorMessage.svelte";
  import FormContainer from "./Form/FormContainer.svelte";
  import Hearth from "./Form/Hearth.svelte";
  import Input from "./Form/Input.svelte";
  import InputContainer from "./Form/InputContainer.svelte";
  import Label from "./Form/Label.svelte";
  import Submit from "./Form/Submit.svelte";

  export let form: ActionData;
  export let book: BookInsert;
  export let edit = false;
  let loading = false;

  async function submit() {
    loading = true;

    if (form) {
      form.errorMessage = undefined;
      form.issues = undefined;
    }
  }
</script>

<FormContainer onSubmit={submit} action={edit ? "?/update" : "?/add"}>
  <div
    class="relative mb-2 flex items-center justify-center rounded-lg bg-neutral-100 p-10"
  >
    <img
      class="w-36 shadow-lg drop-shadow-lg"
      src={book.img}
      alt={book.title}
    />
    <div class="absolute bottom-3 right-3">
      {#if book.status === "read" && book.favorite !== undefined}
        <Hearth id="favorite" bind:checked={book.favorite} />
      {/if}
    </div>
  </div>
  <Input
    id="img"
    label="Img URL"
    required={true}
    type="text"
    placeholder="https://example.com/image.jpg"
    bind:value={book.img}
  />
  <Input
    id="title"
    label="Title"
    required={true}
    type="text"
    placeholder="Game of Thrones"
    bind:value={book.title}
  />
  <Input
    id="author"
    label="Author"
    required={true}
    type="text"
    placeholder="George R. R. Martin"
    bind:value={book.author}
  />
  <InputContainer>
    <Label htmlFor="status">Status</Label>
    <select
      id="status"
      name="status"
      class="border-none py-0 pl-0 pr-8 text-sm focus-within:ring-0 focus:outline-none focus:ring-0"
      bind:value={book.status}
      on:change={() => {
        if (book.status === "read")
          book.finished = new Date().toISOString().split("T")[0];
        else book.finished = null;

        if (book.status !== "read") book.favorite = false;
      }}
    >
      <option value="to-read">To Read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
  </InputContainer>
  {#if book.status === "read"}
    <InputContainer>
      <Label htmlFor="finished">Finished</Label>
      <input
        id="finished"
        name="finished"
        required
        type="date"
        class="border-none p-0 text-sm focus-within:ring-0 focus:outline-none focus:ring-0"
        bind:value={book.finished}
      />
    </InputContainer>
  {/if}

  <div class="mb-7 mt-7 flex items-center gap-3">
    <Submit value={edit ? `Update` : `Add`} bind:loading />
    <slot />
  </div>
  {#if form?.issues || form?.errorMessage}
    <ErrorMessage issues={form.issues} message={form.errorMessage} />
  {/if}
</FormContainer>
