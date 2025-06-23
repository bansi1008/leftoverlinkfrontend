"use client";

import {
  FiX,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiFileText,
} from "react-icons/fi";
import styles from "./DonationDetailsModal.module.css";

export default function DonationDetailsModal({ donation, isOpen, onClose }) {
  if (!isOpen || !donation) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "#f093fb", bg: "#f093fb20", text: "Pending" },
      approved: { color: "#4facfe", bg: "#4facfe20", text: "Approved" },
      completed: { color: "#43e97b", bg: "#43e97b20", text: "Completed" },
      rejected: { color: "#ff6b6b", bg: "#ff6b6b20", text: "Rejected" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={styles.statusBadge}
        style={{
          color: config.color,
          backgroundColor: config.bg,
        }}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Donation Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Image Section */}
          {donation.imageurl && (
            <div className={styles.imageSection}>
              <img
                src={donation.imageurl}
                alt={donation.title}
                className={styles.donationImage}
              />
            </div>
          )}

          {/* Title and Status */}
          <div className={styles.titleSection}>
            <h3 className={styles.donationTitle}>{donation.title}</h3>
            {getStatusBadge(donation.status)}
          </div>

          {/* Details Grid */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <FiTag />
              </div>
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Category</span>
                <span className={styles.detailValue}>{donation.category}</span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <FiPackage />
              </div>
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Quantity</span>
                <span className={styles.detailValue}>{donation.quantity}</span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <FiMapPin />
              </div>
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{donation.location}</span>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                <FiCalendar />
              </div>
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>Expiry Date</span>
                <span className={styles.detailValue}>
                  {formatDate(donation.expiry_date)}
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className={styles.descriptionSection}>
            <div className={styles.descriptionHeader}>
              <FiFileText className={styles.descriptionIcon} />
              <h4 className={styles.descriptionTitle}>Description</h4>
            </div>
            <p className={styles.descriptionText}>{donation.description}</p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.editButton}>Edit Donation</button>
          <button className={styles.closeModalButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
