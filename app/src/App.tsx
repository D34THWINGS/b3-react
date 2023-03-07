// App.tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './screens/Login'
import { Feed, feedLoader } from './screens/Feed'
import { Register } from './screens/Register'
import { ErrorPage } from './components/ErrorPage'
import { AppLayout } from './components/AppLayout'
import { UserProfile, userProfileLoader } from './screens/UserProfile'
import { Events, eventsLoader } from './screens/Events'

// Define the routing and how react router should behave according to
// the current URL of the browser.
//
// The router will choose the route from the root of the array
// the best match for the current URL.
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <AppLayout />,

    // If we're logged and trying to access any page bellow,
    // wrap them with the AppLayout component.
    children: [
      {
        path: '/',
        loader: feedLoader,
        element: <Feed />,
      },
      {
        path: '/profile',
        loader: userProfileLoader,
        element: <UserProfile />,
      },
      {
        path: '/events',
        loader: eventsLoader,
        element: <Events />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
