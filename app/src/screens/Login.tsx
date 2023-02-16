// Login.tsx

import {Title} from "../components/Title";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  return (
    <>
      <Title>Login</Title>
      <form onSubmit={async (event) => {
        event.preventDefault()
        try {
          const response = await fetch("/api/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
          })
          const data = await response.json()
          if (response.status >= 400 && response.status < 500) {
            // User input was incorrect or email already used
            setError(data.message)
            return
          }
          if (response.status >= 500) {
            // Something went wrong on the server that is not related to the user
            setError("Something went wrong")
            return
          }
        } catch (e) {
          // Handle network errors
          if (e instanceof Error){
            setError(e.message)
          }
          return
        }
        // If everything went fine, navigate to the feed
        navigate("/")
      }}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Name"
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </>
  )
}
