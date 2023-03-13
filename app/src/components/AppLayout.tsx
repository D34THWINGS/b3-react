import { NavBar } from './NavBar'
import { Outlet, useLoaderData } from 'react-router-dom'
import { Chat } from './Chat/Chat'

export function AppLayout() {
  const user = useLoaderData() as { id: string }
  return (
    <>
      <NavBar />

      {/* Outlet is a placeholder for sub-routing */}
      <Outlet />

      <Chat userId={user.id} />
    </>
  )
}
