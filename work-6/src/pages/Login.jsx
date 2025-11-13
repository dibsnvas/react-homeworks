export default function Login() {
  return (
    <section className="login-page">
      <h1>Login</h1>
      <p>This feature is coming soon!</p>
      
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" disabled />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" disabled />
        </div>
        
        <button type="submit" disabled>
          Login
        </button>
      </form>
    </section>
  );
}