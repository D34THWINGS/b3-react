import { ActionFunctionArgs, Form, Link, redirect, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await fetchWithErrorHandling('/api/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      name: formData.get('name'),
    }),
  })
  return redirect('/')
}

export function Register() {
  const [error, setError] = useState<string | null>(null)
  return (
    <>
      <h1>Register</h1>
      <Form method="post">
        <input type="email" name="email" placeholder="Email..." />
        <input type="text" name="name" placeholder="Name..." />
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </Form>
      <Link to="/login">Login</Link>
    </>
  )
}
