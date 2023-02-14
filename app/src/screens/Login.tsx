// Login.tsx

import {Title} from "../components/Title";
import {Link} from "react-router-dom";

export function Login() {
  return (
    <>
      <Title>Login</Title>
      <form method="POST" action="/login">
        <input type="email" name="email" placeholder="Name"/>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </>
  )
}
