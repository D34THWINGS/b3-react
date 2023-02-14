function Register() {
  return (
    <React.Fragment>
      <h1>Register</h1>
      <form method="POST" action="/register">
        <input type="email" name="email" placeholder="Email..."/>
        <input type="text" name="name" placeholder="Name..."/>
        <button type="submit">Register</button>
      </form>
    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Register />);
