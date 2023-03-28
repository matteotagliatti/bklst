import { useRef } from "react";
import Layout from "../components/Shared/Layout";
import Back from "../components/UI/Back";
import InputContainer from "../components/UI/Form/InputContainer";
import Label from "../components/UI/Form/Label";
import Input from "../components/UI/Form/Input";
import Submit from "../components/UI/Form/Submit";

export default function SignIn({ pb, setUser }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  async function login(event) {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    event.preventDefault();
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password);
    setUser(authData);
    sessionStorage.setItem("authData", JSON.stringify(authData));
    window.location.href = "/";
  }

  return (
    <Layout variant={"small"}>
      <Back to="/" />
      <div className="max-w-md">
        <h2 className="mb-2 text-2xl">Login</h2>
        <p className="mb-12 text-sm text-neutral-400">
          Sign in with the credential provided. If you don't have one, please{" "}
          <a
            className="underline"
            target="_blank"
            href="mailto:matteotagliatti@gmail.com"
          >
            contact me
          </a>
          .
        </p>
      </div>

      <form onSubmit={login} className="flex flex-col md:max-w-md">
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            required={true}
            type="text"
            placeholder="yourname@email.com"
            inputRef={emailRef}
            defaultValue="matteotagliatti@gmail.com"
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="email">Password</Label>
          <Input
            required={true}
            type="password"
            placeholder="Your password"
            inputRef={passwordRef}
            defaultValue="password"
          />
        </InputContainer>
        <Submit value={"Sign In"} />
      </form>
    </Layout>
  );
}
