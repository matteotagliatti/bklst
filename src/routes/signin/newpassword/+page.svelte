<script type="ts">
  import BackIcon from "$lib/components/BackIcon.svelte";
  import ErrorMessage from "$lib/components/Form/ErrorMessage.svelte";
  import FormContainer from "$lib/components/Form/FormContainer.svelte";
  import Input from "$lib/components/Form/Input.svelte";
  import Submit from "$lib/components/Form/Submit.svelte";
  import SubmitContainer from "$lib/components/Form/SubmitContainer.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";

  export let form;

  function submit() {
    if (form) {
      form = null;
    }
  }
</script>

<Layout small={true}>
  <BackIcon href="/" />
  <Title
    title="Change Password"
    description="Change the password filling the inputs below."
  />
  <FormContainer onSubmit={submit}>
    <Input
      id="new"
      required={true}
      type="password"
      label="New"
      placeholder="********"
    />
    <Input
      id="confirm"
      required={true}
      type="password"
      label="Confirm"
      placeholder="********"
    />
    <svelte:fragment slot="submit" let:loading>
      <SubmitContainer>
        <Submit value={"Change"} {loading} />
        <div class="space-y-2">
          <ErrorMessage message={form?.errorMessage} issues={form?.issues} />
          {#if form?.success}
            <p class="text-neutral-400 text-sm">
              Password changed successfully.
            </p>
          {/if}
        </div>
      </SubmitContainer>
    </svelte:fragment>
  </FormContainer>
</Layout>
