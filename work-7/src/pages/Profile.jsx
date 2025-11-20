import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>

      <button onClick={logout} style={{ marginTop: 16 }}>
        Logout
      </button>
    </section>
  );
}
