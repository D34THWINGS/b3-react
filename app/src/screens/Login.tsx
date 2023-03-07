// Login.tsx

import { Title } from '../components/Title'
import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom'
import { useState } from 'react'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await fetchWithErrorHandling('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: formData.get('email') }),
  })
  return redirect('/')
}

export function Login() {
  const [error, setError] = useState<string | null>(null)
  return (
    <>
      <Title>Login</Title>
      <Form method="post">
        <input type="email" name="email" placeholder="Name" />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </Form>
      <Link to="/register">Register</Link>
    </>
  )
}
