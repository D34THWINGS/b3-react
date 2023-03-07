import { Title } from '../components/Title'
import { ActionFunctionArgs, Form, useLoaderData } from 'react-router-dom'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'

type FeedData = { id: number; title: string }[]

export async function feedLoader() {
  const response = await fetch('/api/v1/posts')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as FeedData
}

export async function addPostAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const post = await fetchWithErrorHandling('/api/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: formData.get('title'),
    }),
  })
  return { post }
}

export function Feed() {
  const data = useLoaderData() as FeedData
  return (
    <>
      <Title>Feed</Title>

      <Form method="post">
        <textarea name="title" placeholder="Write something about your passionate life 🥱" rows={5} />
        <button type="submit">Post</button>
      </Form>

      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  )
}
