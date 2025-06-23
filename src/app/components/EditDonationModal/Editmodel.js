"use client";
import {
  FiX,
  FiEdit,
  FiSave,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiFileText,
  FiHash,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import styles from "./EditDonationModal.module.css";

export default function EditDonationModal({
  setFormData,
  formData,
  handleedit,
  id,
  isOpen,
  onClose,
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await handleedit(id);
      // Close modal after successful edit
      setTimeout(() => {
        onClose();
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating donation:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <FiEdit className={styles.headerIcon} />
            <h2 className={styles.modalTitle}>Edit Donation</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiEdit className={styles.labelIcon} />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handlechange}
                placeholder="Enter donation title"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiTag className={styles.labelIcon} />
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handlechange}
                placeholder="Enter category"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiMapPin className={styles.labelIcon} />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handlechange}
                placeholder="Enter pickup location"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiHash className={styles.labelIcon} />
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handlechange}
                placeholder="Enter quantity"
                className={styles.input}
                min="1"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <FiCalendar className={styles.labelIcon} />
                Expiry Date
              </label>
              <input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handlechange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FiFileText className={styles.labelIcon} />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handlechange}
              placeholder="Enter detailed description of the food donation"
              className={styles.textarea}
              rows={4}
              required
            />
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  Updating...
                </>
              ) : (
                <>
                  <FiSave />
                  Update Donation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
