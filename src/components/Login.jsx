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
      <h2>Login</h2>
      <form onSubmit={login}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
