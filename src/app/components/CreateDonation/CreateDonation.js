"use client";

import { useState } from "react";
import { FiArrowLeft, FiUpload, FiMapPin } from "react-icons/fi";
import styles from "./CreateDonation.module.css";
import axiosInstance from "../../utils/axiosInstance";

export default function CreateDonation({ onBack }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    quantity: "",
    expiry_date: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("expiry_date", formData.expiry_date);

      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }

      const response = await axiosInstance.post("/donation", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Donation created successfully:", response.data);
      alert("Donation created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        quantity: "",
        expiry_date: "",
      });
      setSelectedFile(null);

      // Go back to dashboard
      onBack();
    } catch (error) {
      console.error("Error creating donation:", error);
      alert("Error creating donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.createDonation}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft />
          Back to Dashboard
        </button>
        <h1 className={styles.title}>Create New Donation</h1>
        <p className={styles.subtitle}>
          Share your leftover food with those in need
        </p>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Donation Details</h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Title *</label>
                <input
                  type="text"
                  name="title"
                  className={styles.input}
                  placeholder="e.g., Fresh Vegetables, Rice, Bread"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select
                  name="category"
                  className={styles.select}
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="cloth">Cloth</option>
                  <option value="Medical">Medical</option>
                  <option value="Education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  className={styles.input}
                  placeholder="Enter quantity (numbers only)"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description *</label>
              <textarea
                name="description"
                className={styles.textarea}
                placeholder="Describe the items, condition, packaging, etc."
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Location & Pickup</h2>

            <div className={styles.formGroup}>
              <label className={styles.label}>Pickup Address *</label>
              <div className={styles.inputWithIcon}>
                <FiMapPin className={styles.inputIcon} />
                <input
                  type="text"
                  name="location"
                  className={styles.input}
                  placeholder="Enter your address"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Expiry Date *</label>
                <input
                  type="date"
                  name="expiry_date"
                  className={styles.input}
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Donation Images</h2>

            <div className={styles.uploadArea}>
              <FiUpload className={styles.uploadIcon} />
              <h3 className={styles.uploadTitle}>Upload Donation Images</h3>
              <p className={styles.uploadDescription}>
                Add photos to help NGOs understand the donation better
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => document.getElementById("fileInput").click()}
              >
                Choose Files
              </button>
              {selectedFile && (
                <p className={styles.fileName}>Selected: {selectedFile.name}</p>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onBack}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
