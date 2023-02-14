import {Link} from "react-router-dom";

export function Register() {
  return (
    <>
      <h1>Register</h1>
      <form method="POST" action="/register">
        <input type="email" name="email" placeholder="Email..."/>
        <input type="text" name="name" placeholder="Name..."/>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  )
}
