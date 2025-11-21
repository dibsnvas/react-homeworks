import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    navigate("/profile");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Failed to sign up");
    } finally {
      setSubmitting(false);
    }
  }


return (
  <section className="auth-page">
    <div className="auth-card">
      <h1 className="auth-title">Sign Up</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">
          Email
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="auth-label">
          Password
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && (
        <p className="auth-error">
          {error}
        </p>
      )}

      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  </section>
);
}
