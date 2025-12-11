import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { uploadProfilePhoto, getUserProfile } from "../services/profileService";

function compressImageInWorker(file) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("../workers/imageCompressor.js", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = (event) => {
      const { success, blob, error } = event.data;

      if (success) {
        const compressedFile = new File([blob], file.name, { type: blob.type });
        resolve(compressedFile);
      } else {
        reject(new Error(error || "Compression failed"));
      }

      worker.terminate();
    };

    worker.onerror = (err) => {
      worker.terminate();
      reject(err);
    };

    worker.postMessage(file);
  });
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // "data:image/jpeg;base64,..."
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Profile() {
  const { user, loading, logout } = useAuth();

  const [photoUrl, setPhotoUrl] = useState(null); // тут base64
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!user) return;
      try {
        const profile = await getUserProfile(user.uid);
        if (!cancelled && profile?.photo) {
          setPhotoUrl(profile.photo); // 👈 читаем поле photo
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 64 }}>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadError(null);
    setUploading(true);

    try {
      const compressed = await compressImageInWorker(file);

      const base64 = await fileToBase64(compressed);

      const savedBase64 = await uploadProfilePhoto(user.uid, base64);

      setPhotoUrl(savedBase64);
    } catch (err) {
      console.error(err);
      setUploadError(err.message || "Failed to upload photo");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Your Profile</h1>

        <div className="profile-avatar-block">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              className="profile-avatar"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
          ) : (
            <div
              className="profile-avatar placeholder"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "2px dashed #666",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
              }}
            >
              🙂
            </div>
          )}

          <label
            style={{
              marginTop: 12,
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 6,
              background: "#444",
              color: "#fff",
              cursor: uploading ? "default" : "pointer",
              opacity: uploading ? 0.7 : 1,
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              disabled={uploading}
            />
            {uploading ? "Uploading..." : "Upload photo"}
          </label>

          {uploadError && (
            <p style={{ color: "salmon", marginTop: 8 }}>{uploadError}</p>
          )}
        </div>

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

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
}
