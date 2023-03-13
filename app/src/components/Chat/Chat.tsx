import React, { useEffect, useRef, useState } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatWrapper } from './ChatWrapper'

type Message = {
  type: string
  data: {
    user: {
      id: string
      name: string
    }
    msg: string
    date: string
  }
}

export function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [message, setMessage] = useState('')

  const wsRef = useRef<WebSocket>()
  useEffect(() => {
    const url = new URL('/ws', window.origin)
    url.protocol = 'ws:'
    wsRef.current = new WebSocket(url)
    wsRef.current.addEventListener('message', event => {
      const message = JSON.parse(event.data) as Message
      setMessages(oldMessages => [...oldMessages, message])
    })
  }, [])

  return (
    <ChatWrapper>
      {messages.map(message => (
        <ChatMessage
          author={message.data.user.name}
          message={message.data.msg}
          isOwnMessage
          timestamp={new Date(message.data.date).getTime()}
        />
      ))}
      <form
        onSubmit={event => {
          event.preventDefault()
          wsRef.current?.send(message)
          setMessage('')
        }}
      >
        <input type="text" value={message} onChange={event => setMessage(event.currentTarget.value)} />
        <button type="submit">Send</button>
      </form>
    </ChatWrapper>
  )
}
