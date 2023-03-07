import { Title } from '../components/Title'
import { useLoaderData } from 'react-router-dom'

type FeedData = { id: number; title: string }[]

export async function feedLoader() {
  const response = await fetch('/api/v1/posts')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as FeedData
}

export function Feed() {
  const data = useLoaderData() as FeedData
  return (
    <>
      <Title>Feed</Title>

      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  )
}
