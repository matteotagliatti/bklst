<script lang="ts">
  import { goto } from "$app/navigation";
  import BackIcon from "$lib/components/BackIcon.svelte";
  import ErrorMessage from "$lib/components/Form/ErrorMessage.svelte";
  import FormContainer from "$lib/components/Form/FormContainer.svelte";
  import Input from "$lib/components/Form/Input.svelte";
  import InputContainer from "$lib/components/Form/InputContainer.svelte";
  import Label from "$lib/components/Form/Label.svelte";
  import Submit from "$lib/components/Form/Submit.svelte";
  import SubmitContainer from "$lib/components/Form/SubmitContainer.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";

  export let data;

  let errorMessage: string | null = null;

  let formData = {
    email: "",
    password: "",
  };

  let loading = false;

  async function login() {
    const { supabase } = data;
    loading = true;
    errorMessage = null;

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      errorMessage = error.message;
      loading = false;
      return;
    }

    goto("/");
    loading = false;
  }
</script>

<Layout small={true}>
  <BackIcon href="/" />
  <Title
    title="Login"
    description="Sign in with the credential provided. If you don't have one, please contant via the button on the homepage."
  />
  <FormContainer onSubmit={login}>
    <InputContainer>
      <Label htmlFor="email">Email</Label>
      <Input
        required={true}
        type="email"
        placeholder="yourname@email.com"
        bind:value={formData.email}
      />
    </InputContainer>
    <InputContainer>
      <Label htmlFor="password">Password</Label>
      <Input
        required={true}
        type="password"
        placeholder="Your password"
        bind:value={formData.password}
      />
    </InputContainer>
    <SubmitContainer>
      <Submit value={"Sign In"} bind:loading />
      {#if errorMessage}
        <ErrorMessage message={errorMessage} />
      {/if}
    </SubmitContainer>
  </FormContainer>
</Layout>
