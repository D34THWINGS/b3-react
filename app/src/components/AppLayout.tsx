import {NavBar} from "./NavBar";
import {Outlet} from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <NavBar/>
      {/* Outlet is a placeholder for sub-routing */}
      <Outlet/>
    </>
  )
}
