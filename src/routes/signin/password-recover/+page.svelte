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

  function submit() {
    if (form) {
      form = null;
    }
  }
</script>

<Layout small={true}>
  <BackIcon href="/signin" />
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
    <svelte:fragment slot="submit" let:loading>
      <SubmitContainer>
        <Submit value={"Send"} {loading} />
        <div class="space-y-2">
          <ErrorMessage message={form?.errorMessage} issues={form?.issues} />
          {#if form?.success}
            <p class="text-neutral-400 text-sm hover:underline">
              Check your email for the reset-password email from
              mail.app.supabase.io
            </p>
          {/if}
        </div>
      </SubmitContainer>
    </svelte:fragment>
  </FormContainer>
</Layout>
