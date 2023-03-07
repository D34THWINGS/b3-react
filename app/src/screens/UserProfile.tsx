import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'

type UserProfileData = { id: number; name: string; email: string }

export async function userProfileLoader() {
  const response = await fetch('/api/v1/profile')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as UserProfileData
}

export function UserProfile() {
  const navigate = useNavigate()

  // Data loaded from the router dataloader (App.tsx)
  const data = useLoaderData() as UserProfileData

  // Form state (local memory of the component)
  const [email, setEmail] = useState(data.email)
  const [name, setName] = useState(data.name)
  const [error, setError] = useState<string | null>(null)

  const [deleteError, setDeleteError] = useState<string | null>(null)

  return (
    <div>
      <h1>User profile</h1>
      <form
        onSubmit={async event => {
          // Prevent the browser from submitting the form and reloading the page
          event.preventDefault()

          try {
            await fetchWithErrorHandling('/api/v1/profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, name }),
            })
          } catch (e) {
            if (e instanceof Error) {
              setError(e.message)
            }
          }
        }}
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name..." />
        {error && <p>{error}</p>}
        <button type="submit">Save</button>
      </form>
      <hr />
      <h2>Account management</h2>
      <button
        type="button"
        onClick={async () => {
          try {
            await fetchWithErrorHandling('/api/v1/profile', {
              method: 'DELETE',
            })
            // If everything went fine, navigate to the feed
            navigate('/login')
          } catch (e) {
            if (e instanceof Error) {
              setDeleteError(e.message)
            }
          }
        }}
      >
        Delete account
      </button>
      {deleteError && <p>{deleteError}</p>}
    </div>
  )
}
