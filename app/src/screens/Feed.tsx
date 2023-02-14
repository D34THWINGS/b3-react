import {Title} from "../components/Title";
import {NavBar} from "../components/NavBar";
import {ChatWrapper} from "../components/Chat/ChatWrapper";
import {ChatMessage} from "../components/Chat/ChatMessage";

export function Feed() {
  return (
    <>
      <NavBar/>
      <Title>Feed</Title>
      <i id="chat-status"/>
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
