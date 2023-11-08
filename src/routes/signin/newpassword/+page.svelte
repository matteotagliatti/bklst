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

  let loading = false;

  function submit() {
    loading = true;

    if (form) {
      form.errorMessage = undefined;
      form.issues = undefined;
      form.success = undefined;
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
    <SubmitContainer>
      <Submit value={"Change"} bind:loading />
      <div class="space-y-2">
        {#if form?.errorMessage || form?.issues}
          <ErrorMessage message={form.errorMessage} issues={form.issues} />
        {/if}
        {#if form?.success}
          <p class="text-neutral-400 text-sm hover:underline">
            Password changed successfully.
          </p>
        {/if}
      </div>
    </SubmitContainer>
  </FormContainer>
</Layout>
