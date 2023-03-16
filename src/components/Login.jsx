import { useRef } from "react";

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
    localStorage.setItem("authData", JSON.stringify(authData));
  }

  return (
    <div className="mt-10">
      <h2 className="text-neutral900 font-medium mb-1">Login</h2>
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
          className="w-fit hover:cursor-pointer"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
}
