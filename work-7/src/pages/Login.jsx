import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

      <p style={{ marginTop: 12 }}>
        Don't have an account?{" "}
        <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
}
