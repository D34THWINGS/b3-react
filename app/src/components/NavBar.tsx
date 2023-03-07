import {Link, useNavigate} from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate()
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
      <Link
        to="/profile"
        style={{
          color: 'white',
          textDecoration: 'none'
        }}>
        Profile
      </Link>
      <button
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={async () => {
          await fetch("/api/v1/logout", { method: "POST" })
          navigate("/login")
        }}
      >
        Logout
      </button>
    </nav>
  );
}
