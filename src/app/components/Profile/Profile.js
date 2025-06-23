"use client";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiLoader,
  FiCamera,
  FiUpload,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import axiosInstance from "../../utils/axiosInstance";

export default function Profile({ userType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    contactnumber: "",
    adress: "",
    organization: "",
    bio: "",
    profileImage: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setError("");
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    try {
      setIsUploadingImage(true);
      setError("");

      console.log(
        "Uploading image:",
        selectedImage.name,
        "Size:",
        selectedImage.size
      );
      console.log(
        "Upload URL:",
        axiosInstance.defaults.baseURL + "/profileimage"
      );

      const formData = new FormData();
      formData.append("profileImage", selectedImage);

      // Log FormData contents
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Try different possible endpoints in case the endpoint name is different
      let response;
      try {
        response = await axiosInstance.patch("/profileimage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (firstError) {
        console.log("First attempt failed, trying alternative endpoints...");

        // Try alternative endpoints
        try {
          response = await axiosInstance.post("/profileimage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (secondError) {
          try {
            response = await axiosInstance.patch("/profile/image", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          } catch (thirdError) {
            // If all attempts fail, throw the original error
            throw firstError;
          }
        }
      }

      console.log("Image uploaded successfully:", response.data);

      // Update profile data with new image URL
      const imageUrl =
        response.data.imageUrl ||
        response.data.profileImage ||
        response.data.url ||
        response.data.image;

      setProfileData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));

      setSuccess("Profile image updated successfully!");
      setSelectedImage(null);
      setImagePreview(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Detailed error uploading image:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);

      let errorMessage = "Failed to upload image. Please try again.";

      if (error.response?.status === 413) {
        errorMessage =
          "Image file is too large. Please choose a smaller image.";
      } else if (error.response?.status === 415) {
        errorMessage = "Unsupported image format. Please use JPG, PNG, or GIF.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      setError(errorMessage);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const cancelImageUpload = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError("");
  };

  const handleprofiledetails = async () => {
    try {
      setIsLoading(true);
      setError("");
      console.log(
        "Fetching profile data from:",
        axiosInstance.defaults.baseURL + "/profile"
      );

      const response = await axiosInstance.get("/profile");
      console.log("Raw API response:", response);

      if (response.data) {
        // Ensure we have all required fields with fallbacks
        const profileDataWithDefaults = {
          name: response.data.name || "",
          email: response.data.email || "",
          contactnumber: response.data.contactnumber || "",
          adress: response.data.adress || response.data.address || "",
          organization: response.data.organization || "",
          bio: response.data.bio || "",
          profileImage:
            response.data.profileimageurl || response.data.imageUrl || "",
        };

        setProfileData(profileDataWithDefaults);
        setOriginalData(profileDataWithDefaults);
        console.log("Profile data set successfully:", profileDataWithDefaults);
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
      console.error("Detailed error fetching profile data:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to load profile data. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleprofiledetails();
  }, []);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear any existing messages when user starts typing
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      // Prepare payload with only editable fields
      const updatePayload = {
        contactnumber: profileData.contactnumber,
        adress: profileData.adress,
        bio: profileData.bio,
      };

      // Add organization for NGO users
      if (userType === "ngo" && profileData.organization) {
        updatePayload.organization = profileData.organization;
      }

      const response = await axiosInstance.patch(
        "/profileupdate",
        updatePayload
      );
      console.log("Profile updated successfully:", response.data);

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setOriginalData(profileData);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  if (isLoading) {
    return (
      <div className={styles.profile}>
        <div className={styles.loadingContainer}>
          <FiLoader className={styles.loadingSpinner} />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.subtitle}>Manage your account information</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {success && <div className={styles.successMessage}>{success}</div>}

      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={styles.avatarImage}
                  />
                ) : profileData.profileImage ? (
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className={styles.avatarImage}
                  />
                ) : (
                  <FiUser />
                )}
              </div>

              <div className={styles.imageControls}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className={styles.fileInput}
                  id="profile-image-upload"
                />
                <label
                  htmlFor="profile-image-upload"
                  className={styles.uploadLabel}
                >
                  <FiCamera />
                  Select Photo
                </label>
              </div>
            </div>

            {selectedImage && (
              <div className={styles.uploadActions}>
                <button
                  className={styles.uploadButton}
                  onClick={handleImageUpload}
                  disabled={isUploadingImage}
                >
                  {isUploadingImage ? (
                    <>
                      <FiLoader className={styles.spinner} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FiUpload />
                      Upload Photo
                    </>
                  )}
                </button>
                <button
                  className={styles.cancelUploadButton}
                  onClick={cancelImageUpload}
                  disabled={isUploadingImage}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <div className={styles.actionButtons}>
                {isEditing ? (
                  <>
                    <button
                      className={styles.cancelButton}
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.saveButton}
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <FiLoader className={styles.spinner} />
                      ) : (
                        <FiSave />
                      )}
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit2 />
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWithIcon}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    type="text"
                    className={`${styles.input} ${styles.disabledField}`}
                    value={profileData.name || ""}
                    disabled={true}
                    title="Name cannot be changed"
                  />
                </div>
                <small className={styles.fieldNote}>
                  Name cannot be changed
                </small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWithIcon}>
                  <FiMail className={styles.inputIcon} />
                  <input
                    type="email"
                    className={`${styles.input} ${styles.disabledField}`}
                    value={profileData.email || ""}
                    disabled={true}
                    title="Email cannot be changed"
                  />
                </div>
                <small className={styles.fieldNote}>
                  Email cannot be changed
                </small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <div className={styles.inputWithIcon}>
                  <FiPhone className={styles.inputIcon} />
                  <input
                    type="tel"
                    className={styles.input}
                    value={profileData.contactnumber || ""}
                    onChange={(e) =>
                      handleInputChange("contactnumber", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Address</label>
                <div className={styles.inputWithIcon}>
                  <FiMapPin className={styles.inputIcon} />
                  <input
                    type="text"
                    className={styles.input}
                    value={profileData.adress || ""}
                    onChange={(e) =>
                      handleInputChange("adress", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              {userType === "ngo" && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Organization Name</label>
                  <div className={styles.inputWithIcon}>
                    <FiUser className={styles.inputIcon} />
                    <input
                      type="text"
                      className={styles.input}
                      value={profileData.organization || ""}
                      onChange={(e) =>
                        handleInputChange("organization", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder="Enter organization name"
                    />
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  {userType === "donor" ? "Bio" : "Organization Description"}
                </label>
                <textarea
                  className={styles.textarea}
                  value={profileData.bio || ""}
                  placeholder={`Enter your ${
                    userType === "donor" ? "bio" : "organization description"
                  }`}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows="4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsCard}>
          <h3 className={styles.statsTitle}>Account Statistics</h3>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Member Since</span>
              <span className={styles.statValue}>January 2024</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>
                {userType === "donor" ? "Total Donations" : "Total Requests"}
              </span>
              <span className={styles.statValue}>24</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Impact Score</span>
              <span className={styles.statValue}>950 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
