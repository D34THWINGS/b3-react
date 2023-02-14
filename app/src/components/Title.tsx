import {ReactNode} from "react";

export function Title({
  children
}: { children: ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: 'Arial',
        fontSize: '2.5rem'
      }}
    >
      {children}
    </h1>
  )
}
