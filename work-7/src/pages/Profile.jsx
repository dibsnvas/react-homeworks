import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 64 }}>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Your Profile</h1>

        <div className="profile-info">
          <div className="profile-info-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-label">User ID</span>
            <span className="profile-value">{user.uid}</span>
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </section>
  );
}
