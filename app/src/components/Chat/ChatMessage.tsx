export function ChatMessage({
                              message,
                              author,
                              timestamp,
                              isOwnMessage,
                            }: {
  // Message content
  message: string
  // Author of the message
  author: string
  // Timestamp in milliseconds when message was sent
  timestamp: number
  // Tells if the message is sent by logged user
  isOwnMessage?: boolean
}) {
  return (
    <div
      style={{
        padding: 8,
        borderRadius: 4,
        backgroundColor: isOwnMessage ? '#333fff' : '#D0D0D0FF',
        color: isOwnMessage ? '#fff' : '#333',
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
      }}
    >
      <div>
        <b style={{fontWeight: 'bold'}}>
         {author}
        </b>
        &nbsp;-&nbsp;
        {new Date(timestamp).toLocaleString(
          'fr-FR',
          {timeStyle: 'short'}
        )}
      </div>
      {message}
    </div>
  );
}
