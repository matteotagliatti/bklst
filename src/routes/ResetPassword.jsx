import { useRef } from "react";
import { supabase } from "../supabase";
import Layout from "../components/Shared/Layout";
import Title from "../components/Shared/Title";
import Back from "../components/UI/Back";
import FormContainer from "../components/UI/Form/FormContainer";
import InputContainer from "../components/UI/Form/InputContainer";
import Label from "../components/UI/Form/Label";
import Input from "../components/UI/Form/Input";
import Submit from "../components/UI/Form/Submit";

export default function ResetPassword({ loading, setLoading }) {
  const emailRef = useRef();

  async function sendResetPassowrd(event) {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      emailRef.current.value
    );

    if (error) {
      console.log(error);
    }

    console.log(data, error);
    setLoading(false);

    // add notif to user to check his email
  }

  return (
    <Layout variant={"small"}>
      <Back to="/" />
      <Title title={"Reset Password"} description="Specify your email below." />
      <FormContainer onSubmit={sendResetPassowrd}>
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            required={true}
            type="email"
            placeholder="yourname@email.com"
            inputRef={emailRef}
          />
        </InputContainer>
        <Submit value={`Send`} loading={loading} />
      </FormContainer>
    </Layout>
  );
}
