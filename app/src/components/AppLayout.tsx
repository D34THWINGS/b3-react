import {NavBar} from "./NavBar";
import {Outlet} from "react-router-dom";
import { ChatMessage } from './Chat/ChatMessage'
import { ChatWrapper } from './Chat/ChatWrapper'

export function AppLayout() {
  return (
    <>
      <NavBar/>

      {/* Outlet is a placeholder for sub-routing */}
      <Outlet/>

      <ChatWrapper>
        <ChatMessage
          author="Bibi"
          message="Salut c'est cool"
          isOwnMessage
          timestamp={Date.now()}
        />
        <ChatMessage
          author="Macron"
          message="Wesh!"
          timestamp={Date.now()}
        />
        <ChatMessage
          author="Bibi"
          message="Ca va ?"
          isOwnMessage
          timestamp={Date.now()}
        />
        <ChatMessage
          author="Macron"
          message="Ouai et toi?"
          timestamp={Date.now()}
        />
        <ChatMessage
          author="Bibi"
          message="Imotep"
          isOwnMessage
          timestamp={Date.now()}
        />
      </ChatWrapper>
    </>
  )
}
