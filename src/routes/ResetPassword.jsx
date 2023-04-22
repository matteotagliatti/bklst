import { useRef, useState } from "react";
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
  const [emailIsSend, setEmailIsSend] = useState(false);

  async function sendResetPassowrd(event) {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      emailRef.current.value
    );

    if (error) {
      console.log(error);
    }

    setLoading(false);
    setEmailIsSend(true);
  }

  return (
    <Layout variant={"small"}>
      <Back to="/" />
      <Title
        title={"Reset Password"}
        description="Specify your email below."
        nopt={true}
      />
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
        {emailIsSend ? (
          <p className="mt-2 text-sm text-red-400">
            Check your email. Even your SPAM folder and click on the link to
            reset the password.
          </p>
        ) : null}
        <Submit value={`Send`} loading={loading} />
      </FormContainer>
    </Layout>
  );
}
