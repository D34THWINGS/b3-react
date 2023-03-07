import { useLoaderData } from 'react-router-dom'

type EventsData = {
  id: number
  title: string
  date: string
  author: {
    id: number
    name: string
  }
}[]

export async function eventsLoader() {
  const response = await fetch('/api/v1/events')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as EventsData
}

export const Events = () => {
  const data = useLoaderData() as EventsData

  return (
    <>
      <h1>Events</h1>

      {data.map(event => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.date}</p>
          <p>{event.author.name}</p>
        </div>
      ))}
    </>
  )
}
