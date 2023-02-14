// App.tsx
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {Login} from "./screens/Login";
import {Feed} from "./screens/Feed";
import {Register} from "./screens/Register";

const router = createBrowserRouter([
  {
    path: "/",
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
