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
  }
</script>

<Layout small={true}>
  <BackIcon href="/" />
  <Title
    title="Login"
    description="Sign in with the credential provided. If you don't have one, please contant via the button on the homepage."
  />
  <FormContainer onSubmit={submit}>
    <Input
      id="email"
      required={true}
      type="email"
      label="Email"
      placeholder="yourname@email.com"
    />
    <Input
      id="password"
      required={true}
      type="password"
      label="Password"
      placeholder="Your password"
    />
    <SubmitContainer>
      <Submit value={"Sign In"} bind:loading />
      {#if form?.errorMessage || form?.issues}
        <ErrorMessage message={form.errorMessage} issues={form.issues} />
      {/if}
    </SubmitContainer>
  </FormContainer>
</Layout>
