function Login() {
  return (
    <React.Fragment>
      <Title>Login</Title>
      <form method="POST" action="/login">
        <input type="email" name="email" placeholder="Name"/>
        <button type="submit">Login</button>
      </form>
    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Login />);
