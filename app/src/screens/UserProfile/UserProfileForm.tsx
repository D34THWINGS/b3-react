import { Form, Outlet, redirect } from 'react-router-dom'
import { fetchWithErrorHandling } from '../../helpers/fetchWithErrorHandling'
import { ActionFunctionArgs } from '@remix-run/router/utils'

export type UserProfileData = {
  id: number
  name: string
  email: string
  photoURL: string
}

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
    body: formData,
  })

  return { user: updatedUser }
}

export async function deleteUserProfileAction() {
  await fetchWithErrorHandling('/api/v1/profile', {
    method: 'DELETE',
  })
  return redirect('/login')
}

export function UserProfileForm({ error, data }: { error?: Error; data?: UserProfileData }) {
  if (!data && !error) {
    throw new Error('No data')
  }

  return (
    <div>
      <h1>User profile</h1>

      {data?.photoURL && <img src={`/api/uploads/${data?.photoURL}`} width={128} />}

      <Form method="put" encType="multipart/form-data">
        <input type="email" name="email" defaultValue={data?.email} placeholder="Email..." />
        <input type="text" name="name" defaultValue={data?.name} placeholder="Name..." />
        <input type="file" name="photo" placeholder="Profile picture" />
        {error && <p>{error.message}</p>}
        <button type="submit">Save</button>
      </Form>
      <hr />
      <h2>Account management</h2>
      <Form method="delete" action="delete">
        <button type="submit">Delete account</button>
      </Form>
      <Outlet />
    </div>
  )
}
