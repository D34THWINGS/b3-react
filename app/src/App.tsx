// App.tsx
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {Login} from "./screens/Login";
import {Feed} from "./screens/Feed";
import {Register} from "./screens/Register";
import {ErrorPage} from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    async loader() {
      const response = await fetch("/api/v1/posts")
      if (response.status === 401) {
        throw new Response(
          "Unauthorized", { status: 401 }
        );
      }
      return await response.json()
    },
    element: <Feed />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
