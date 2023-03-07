import {Title} from "../components/Title";
import {useLoaderData} from "react-router-dom";

export function Feed() {
  const data = useLoaderData() as { id: number, title: string }[]
  return (
    <>
      <Title>Feed</Title>

      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  )
}
