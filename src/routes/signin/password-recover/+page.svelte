<script lang="ts">
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

  async function submit() {
    loading = true;

    if (form) {
      form.errorMessage = undefined;
      form.issues = undefined;
      form.success = undefined;
    }
  }
</script>

<Layout small={true}>
  <BackIcon />
  <Title
    title="Password Recover"
    description="Recover the password with your email."
  />
  <FormContainer onSubmit={submit}>
    <Input
      id="email"
      required={true}
      type="email"
      label="Email"
      placeholder="yourname@email.com"
    />
    <SubmitContainer>
      <Submit value={"Send"} bind:loading />
      <div class="space-y-2">
        {#if form?.errorMessage || form?.issues}
          <ErrorMessage message={form.errorMessage} issues={form.issues} />
        {/if}
        {#if form?.success}
          <p class="text-sm text-neutral-400 hover:underline">
            Check your email for the reset-password email from
            mail.app.supabase.io
          </p>
        {/if}
      </div>
    </SubmitContainer>
  </FormContainer>
</Layout>
