import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Layout from "../components/Shared/Layout";
import Back from "../components/UI/Back";
import Title from "../components/Shared/Title";
import FormContainer from "../components/UI/Form/FormContainer";
import InputContainer from "../components/UI/Form/InputContainer";
import Label from "../components/UI/Form/Label";
import Input from "../components/UI/Form/Input";
import Submit from "../components/UI/Form/Submit";

export default function SignIn({ user, setUser, loading, setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(event) {
    setLoading(true);
    event.preventDefault();
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.error_description || error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  return (
    <Layout variant={"small"}>
      <Back to="/" />
      <Title
        title={"Login"}
        description={
          "Sign in with the credential provided. If you don't have one, please contant via the button on the homepage."
        }
      />
      <FormContainer onSubmit={login}>
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            required={true}
            type="text"
            placeholder="yourname@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">Password</Label>
          <Input
            required={true}
            type="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <Submit value={"Sign In"} loading={loading} />
      </FormContainer>
    </Layout>
  );
}
