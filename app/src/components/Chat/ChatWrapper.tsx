import React, {ReactNode} from 'react';

export function ChatWrapper({children}: {
  children: ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        padding: 8,
        position: 'fixed',
        bottom: 0,
        right: '1rem',
        height: 400,
        width: 300,
        border: '1px solid #ccc',
        borderBottom: 0,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        // Allows scrolling
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  );
}
