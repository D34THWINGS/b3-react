import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'

type EventData = {
  id: string
  title: string
  date: string
  createdBy: {
    name: string
  }
}

export async function eventLoader({ params }: LoaderFunctionArgs) {
  return await fetchWithErrorHandling(`/api/v1/event/${params.eventId}`)
}

export function Event() {
  const data = useLoaderData() as EventData
  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <p>{data.createdBy.name}</p>
    </>
  )
}
