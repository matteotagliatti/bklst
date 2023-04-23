import { useEffect, useRef } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import Layout from "../components/Shared/Layout";
import Back from "../components/UI/Back";
import Title from "../components/Shared/Title";
import FormContainer from "../components/UI/Form/FormContainer";
import InputContainer from "../components/UI/Form/InputContainer";
import Label from "../components/UI/Form/Label";
import Input from "../components/UI/Form/Input";
import Submit from "../components/UI/Form/Submit";

export default function SignIn({ user, loading, setLoading }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  async function login(event) {
    setLoading(true);
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: emailRef.current.value,
      password: passwordRef.current.value,
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
        <Submit value={"Sign In"} loading={loading} />
        <Link
          className="mt-5 text-sm text-neutral-400 hover:underline"
          to="/password-reset"
        >
          Forgot password?
        </Link>
      </FormContainer>
    </Layout>
  );
}
