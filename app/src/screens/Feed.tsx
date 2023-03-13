import { Title } from '../components/Title'
import { ActionFunctionArgs, Form } from 'react-router-dom'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'
import { useEffect, useRef, useState } from 'react'
import { ErrorPage } from '../components/ErrorPage'

type FeedData = { id: number; title: string; createdAt: string }[]

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
  const [data, setData] = useState<FeedData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasFetched = useRef(false)
  useEffect(() => {
    if (hasFetched.current) {
      return
    }

    async function load() {
      setLoading(true)
      try {
        setData(await fetchWithErrorHandling(`/api/v1/posts`))
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      }
      setLoading(false)
    }

    load()
    hasFetched.current = true
  }, [])

  const [sortedBy, setSortedBy] = useState<'date' | 'name'>('date')

  if (loading || !data) {
    return <div>Loading...</div>
  }

  if (error) {
    return <ErrorPage />
  }

  const sortedData = data.sort((a, b) => {
    if (sortedBy === 'name') {
      return a.title.localeCompare(b.title)
    }

    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <>
      <Title>Feed</Title>

      <Form method="post">
        <textarea name="title" placeholder="Write something about your passionate life 🥱" rows={5} />
        <button type="submit">Post</button>
      </Form>

      <p>
        <button type="button" onClick={() => setSortedBy('date')}>
          Sort by date
        </button>
        <button type="button" onClick={() => setSortedBy('name')}>
          Sort by name
        </button>
      </p>

      {sortedData.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  )
}
