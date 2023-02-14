import {Link} from "react-router-dom";

export function NavBar() {
  return (
    <nav
      style={{
        padding: '1rem',
        background: '#333',
        color: 'white'
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: 'white',
          textDecoration: 'none'
        }}>
        My Chat App
      </Link>
    </nav>
  );
}
