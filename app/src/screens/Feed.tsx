import {Title} from "../components/Title";
import {NavBar} from "../components/NavBar";
import {ChatWrapper} from "../components/Chat/ChatWrapper";
import {ChatMessage} from "../components/Chat/ChatMessage";
import {useLoaderData} from "react-router-dom";

export function Feed() {
  const data = useLoaderData() as { id: number, title: string }[]
  console.log(data)
  return (
    <>
      <NavBar/>
      <Title>Feed</Title>

      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}

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
