"use client";
import styles from "./Dashboard.module.css";
import { CiViewList } from "react-icons/ci";

export default function DonationModal({
  isOpen,
  donation,
  onClose,
  getCategoryColor,
  getExpiryStatus,
  handleData,
}) {
  if (!isOpen || !donation) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{donation.title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Image Section */}
          <div className={styles.modalImageSection}>
            {donation.imageurl ? (
              <img
                src={donation.imageurl}
                alt={donation.title}
                className={styles.modalImage}
              />
            ) : (
              <div className={styles.modalPlaceholderImage}>
                <span>📦</span>
                <p>No image available</p>
              </div>
            )}
            <div
              className={styles.modalCategoryTag}
              style={{
                backgroundColor: getCategoryColor(donation.category),
              }}
            >
              {donation.category}
            </div>
          </div>

          <div className={styles.modalDetails}>
            {/* Description Section */}
            <div className={styles.modalSection}>
              <h3 className={styles.sectionTitle}>
                <CiViewList /> Description
              </h3>
              <p className={styles.descriptionText}>{donation.description}</p>
            </div>

            {/* Item Details */}
            <div className={styles.modalSection}>
              <h3 className={styles.sectionTitle}>📦 Item Details</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailPair}>
                  <span className={styles.detailLabel}>Category:</span>
                  <span className={styles.detailValue}>
                    {donation.category}
                  </span>
                </div>
                <div className={styles.detailPair}>
                  <span className={styles.detailLabel}>Quantity:</span>
                  <span className={styles.detailValue}>
                    {donation.quantity} items
                  </span>
                </div>
                <div className={styles.detailPair}>
                  <span className={styles.detailLabel}>Location:</span>
                  <span className={styles.detailValue}>
                    {donation.location}
                  </span>
                </div>
                <div className={styles.detailPair}>
                  <span className={styles.detailLabel}>Expiry Date:</span>
                  <span
                    className={styles.detailValue}
                    style={{
                      color: getExpiryStatus(donation.expiry_date).color,
                    }}
                  >
                    {donation.expiry_date
                      ? formatDate(donation.expiry_date)
                      : "No expiry date"}
                  </span>
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className={styles.modalSection}>
              <h3 className={styles.sectionTitle}>👤 Donor Information</h3>
              <div className={styles.donorCard}>
                <div className={styles.donorAvatarLarge}>
                  {donation.profileimageurl ? (
                    <img src={donation.profileimageurl} alt={donation.name} />
                  ) : (
                    <div className={styles.avatarPlaceholderLarge}>
                      {donation.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className={styles.donorInfo}>
                  <h4 className={styles.donorNameLarge}>{donation.name}</h4>
                  <p className={styles.donorBio}>
                    Generous donor committed to reducing food waste and helping
                    the community. Active member since 2024.
                  </p>
                  <div className={styles.donorAddress}>
                    📍 {donation.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.modalActions}>
              <button
                className={styles.modalRequestButton}
                onClick={() => {
                  console.log("Request button clicked", donation.id);
                  handleData(donation.id);
                }}
              >
                💌 Request This Donation
              </button>
              <button className={styles.modalContactButton}>
                📞 Contact Donor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
