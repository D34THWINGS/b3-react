import { useState } from 'react'
import { Form, useLoaderData, useNavigate, useRouteError } from 'react-router-dom'
import { fetchWithErrorHandling } from '../../helpers/fetchWithErrorHandling'
import { ActionFunctionArgs } from '@remix-run/router/utils'

export type UserProfileData = { id: number; name: string; email: string }

export async function userProfileLoader() {
  const response = await fetch('/api/v1/profile')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as UserProfileData
}

export async function updateUserProfileAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const updatedUser = await fetchWithErrorHandling('/api/v1/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      name: formData.get('name'),
    }),
  })

  return { user: updatedUser }
}

export function UserProfileForm({ error, data }: { error?: Error; data?: UserProfileData }) {
  const navigate = useNavigate()

  const [deleteError, setDeleteError] = useState<string | null>(null)

  if (!data && !error) {
    throw new Error('No data')
  }

  return (
    <div>
      <h1>User profile</h1>
      <Form method="put">
        <input type="email" name="email" defaultValue={data?.email} placeholder="Email..." />
        <input type="text" name="name" defaultValue={data?.name} placeholder="Name..." />
        {error && <p>{error.message}</p>}
        <button type="submit">Save</button>
      </Form>
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
