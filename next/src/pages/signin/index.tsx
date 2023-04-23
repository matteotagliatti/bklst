import { useRef, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Layout from "@/components/Layout";
import BackIcon from "@/components/Back";
import Title from "@/components/Title";
import FormContainer from "@/components/Form/FormContainer";
import InputContainer from "@/components/Form/InputContainer";
import Label from "@/components/Form/Label";
import Input from "@/components/Form/Input";
import Submit from "@/components/Form/Submit";

export default function SignIn() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function login(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (error) {
      alert(error.error_description || error.message);
    }

    if (!error) {
      alert("You have successfully signed in!");
    }
  }

  return (
    <Layout variant="small">
      <BackIcon href="/" />
      <Title
        title={"Login"}
        description={
          "Sign in with the credential provided. If you don't have one, please contant via the button on the homepage."
        }
        nopt={true}
      />
      <FormContainer onSubmit={login}>
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            required={true}
            type="email"
            placeholder="yourname@email.com"
            inputRef={emailRef}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">Password</Label>
          <Input
            required={true}
            type="password"
            placeholder="Your password"
            inputRef={passwordRef}
          />
        </InputContainer>
        <Submit value={"Sign In"} />
        <Link
          className="mt-5 text-sm text-neutral-400 hover:underline"
          href="/password-reset"
        >
          Forgot password?
        </Link>
      </FormContainer>
    </Layout>
  );
}
