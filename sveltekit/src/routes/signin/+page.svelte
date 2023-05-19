<script lang="ts">
  import BackIcon from "$lib/components/BackIcon.svelte";
  import Layout from "$lib/components/Layout.svelte";
  import Title from "$lib/components/Title.svelte";
  import FormContainer from "$lib/components/Form/FormContainer.svelte";
  import InputContainer from "$lib/components/Form/InputContainer.svelte";
  import Label from "$lib/components/Form/Label.svelte";
  import Input from "$lib/components/Form/Input.svelte";
  import Submit from "$lib/components/Form/Submit.svelte";

  let data = {
    email: "",
    password: "",
  };

  let loading = false;

  function login() {
    console.log(data);
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
        bind:value={data.email}
      />
    </InputContainer>
    <InputContainer>
      <Label htmlFor="password">Password</Label>
      <Input
        required={true}
        type="password"
        placeholder="Your password"
        bind:value={data.password}
      />
    </InputContainer>
    <Submit value={"Sign In"} {loading} />
  </FormContainer>
</Layout>
