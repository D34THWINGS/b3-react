// App.tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, loginAction } from './screens/Login'
import { addPostAction, Feed } from './screens/Feed'
import { Register, registerAction } from './screens/Register'
import { ErrorPage } from './components/ErrorPage'
import { AppLayout } from './components/AppLayout'
import {
  deleteUserProfileAction,
  updateUserProfileAction,
  userProfileLoader,
} from './screens/UserProfile/UserProfileForm'
import { addEventAction, Events, eventsLoader } from './screens/Events'
import { UserProfile } from './screens/UserProfile/UserProfile'
import { UserProfileError } from './screens/UserProfile/UserProfileError'

// Define the routing and how react router should behave according to
// the current URL of the browser.
//
// The router will choose the route from the root of the array
// the best match for the current URL.
const router = createBrowserRouter([
  {
    path: '/login',
    action: loginAction,
    element: <Login />,
  },
  {
    path: '/register',
    action: registerAction,
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
        // loader: feedLoader,
        action: addPostAction,
        element: <Feed />,
      },
      {
        path: '/profile',
        loader: userProfileLoader,
        action: updateUserProfileAction,
        element: <UserProfile />,
        errorElement: <UserProfileError />,
        children: [
          {
            path: '/profile/delete',
            action: deleteUserProfileAction,
            errorElement: <div>Oops, cannot delete account</div>,
          },
        ],
      },
      {
        path: '/events',
        loader: eventsLoader,
        action: addEventAction,
        element: <Events />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
