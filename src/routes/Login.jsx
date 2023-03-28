import { useRef } from "react";
import Layout from "../components/Shared/Layout";
import Back from "../components/UI/Back";

export default function Login({ pb, setUser }) {
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
    <Layout>
      <Back to="/" />
      <h2 className="mb-2 text-2xl">Login</h2>
      <p className="mb-10 text-sm text-neutral-400">
        Login with the credential provided. If you don't have one, please{" "}
        <a
          className="underline"
          target="_blank"
          href="mailto:matteotagliatti@gmail.com"
        >
          contact me
        </a>
        .
      </p>
      <form
        onSubmit={login}
        className="flex flex-col justify-start gap-y-1 md:flex-row md:justify-between"
      >
        <input
          type="text"
          placeholder="email"
          defaultValue={"matteotagliatti@gmail.com"}
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="***"
          defaultValue={"password"}
          ref={passwordRef}
        />
        <input
          className="w-fit hover:cursor-pointer hover:underline"
          type="submit"
          value="Login"
        />
      </form>
    </Layout>
  );
}
