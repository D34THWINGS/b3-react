import {Link} from "react-router-dom";
import {useState} from "react";

export function Register() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        console.log(email, name)
      }}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  )
}
