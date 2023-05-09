"use client";

import { useState } from "react";
import { useSupabase } from "@/supabase-provider";
import { useRouter } from "next/navigation";
import BackIcon from "@/components/back";
import Title from "@/components/title";
import FormContainer from "@/components/form/formcontainer";
import InputContainer from "@/components/form/inputcontainer";
import Label from "@/components/form/label";
import Input from "@/components/form/input";
import Submit from "@/components/form/submit";

export default function SignIn() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);

  interface LoginEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
  }

  function handleEmailChange(e: any): void {
    setEmailValue(e.target.value);
  }

  function handlePasswordChange(e: any): void {
    setPasswordValue(e.target.value);
  }

  async function login(event: LoginEvent) {
    setLoading(true);
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    setLoading(false);
  }

  return (
    <>
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
            onChange={handleEmailChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">Password</Label>
          <Input
            required={true}
            type="password"
            placeholder="Your password"
            onChange={handlePasswordChange}
          />
        </InputContainer>
        <Submit value={"Sign In"} loading={loading} />
      </FormContainer>
    </>
  );
}
