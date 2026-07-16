import React, { useEffect, useState } from "react";
import { getProfilePicture, updateProfilePicture } from "../../api/api";
import { Upload, User, Check, AlertTriangle } from "lucide-react";
import "./ProfilePictureManager.css";

interface ProfilePictureManagerProps {
  token: string;
}

const ProfilePictureManager: React.FC<ProfilePictureManagerProps> = ({ token }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  const fetchProfilePicture = async () => {
    try {
      setLoading(true);
      const res = await getProfilePicture();
      if (res.success && res.data) {
        setImageUrl(res.data.imageUrl);
      } else {
        setImageUrl(null);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching profile picture:", err);
      setError("Failed to load current profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setSuccess(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file first.");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await updateProfilePicture(token, formData);

      if (res.success) {
        setSuccess("Profile picture updated successfully!");
        setImageUrl(res.data.imageUrl);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (document.querySelector('input[type="file"]')) {
          (document.querySelector('input[type="file"]') as HTMLInputElement).value = "";
        }
      } else {
        throw new Error(res.message || "Failed to update profile picture");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-pic-manager">
      <div className="profile-pic-header">
        <h2 className="profile-pic-title">Profile Picture Manager</h2>
        <p className="profile-pic-subtitle">Upload and update your centralized profile picture</p>
      </div>

      {error && (
        <div className="profile-pic-message profile-pic-message--error">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="profile-pic-message profile-pic-message--success">
          <Check size={18} />
          <span>{success}</span>
        </div>
      )}

      <div className="profile-pic-container">
        {/* Left column: Current Image Display */}
        <div className="profile-pic-display-section">
          <h3>Current Picture</h3>
          <div className="profile-pic-preview-container">
            {loading ? (
              <div className="profile-pic-loading-pulse" />
            ) : imageUrl ? (
              <img src={imageUrl} alt="Profile" className="profile-pic-image" />
            ) : (
              <div className="profile-pic-placeholder">
                <User size={64} className="profile-pic-placeholder-icon" />
                <span>No profile picture uploaded</span>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Upload Form */}
        <div className="profile-pic-upload-section">
          <h3>Upload New Picture</h3>
          <form onSubmit={handleUpload} className="profile-pic-form">
            <div className="profile-pic-dropzone">
              <input
                id="profile-pic-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="profile-pic-file-input"
              />
              <label htmlFor="profile-pic-input" className="profile-pic-dropzone-label">
                <Upload size={32} className="profile-pic-upload-icon" />
                <span className="profile-pic-dropzone-text">
                  {selectedFile ? selectedFile.name : "Click to browse or drop image here"}
                </span>
                <span className="profile-pic-dropzone-subtext">Supports JPEG, PNG, WebP up to 5MB</span>
              </label>
            </div>

            {previewUrl && (
              <div className="profile-pic-new-preview">
                <h4>Preview of new picture:</h4>
                <div className="profile-pic-preview-circle">
                  <img src={previewUrl} alt="Preview" />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary profile-pic-submit-btn"
              disabled={uploading || !selectedFile}
            >
              {uploading ? "Uploading..." : "Save Profile Picture"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureManager;
