"use client";

import { FiPackage, FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import styles from "./MyDonations.module.css";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import DonationDetailsModal from "../DonationDetailsModal/DonationDetailsModal";
import EditDonationModal from "../EditDonationModal/Editmodel";

export default function MyDonations() {
  const [item, setItem] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editmodel, setEditmodel] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    quantity: "",
    expiry_date: "",
  });
  const [editDonationId, setEditDonationId] = useState(null);

  const fetchDonations = async () => {
    try {
      const response = await axiosInstance.get("/mydonation");
      setItem(response.data);
      console.log("Donations fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const openEditModal = (donation) => {
    setEditDonationId(donation.id);
    setFormData({
      title: donation.title || "",
      description: donation.description || "",
      category: donation.category || "",
      location: donation.location || "",
      quantity: donation.quantity || "",
      expiry_date: donation.expiry_date || "",
    });
    setEditmodel(true);
  };

  const handleedit = async () => {
    try {
      const prepayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        quantity: formData.quantity,
        expiry_date: formData.expiry_date,
      };
      console.log("Payload for edit:", prepayload);

      console.log("Updating donation for ID:", editDonationId);
      const response = await axiosInstance.patch(
        `/donation/${editDonationId}`,
        prepayload
      );
      console.log("Edit donation updated successfully:", response.data);

      // Refresh donations list to show updated data
      await fetchDonations();

      // Close modal
      setEditmodel(false);
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  const closeEditModal = () => {
    setEditmodel(false);
    setEditDonationId(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      quantity: "",
      expiry_date: "",
    });
  };
  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: "#f093fb", bg: "#f093fb20", text: "available" },
      claimed: { color: "#4facfe", bg: "#4facfe20", text: "claimed" },
      completed: { color: "#43e97b", bg: "#43e97b20", text: "Completed" },
      rejected: { color: "#ff6b6b", bg: "#ff6b6b20", text: "Rejected" },
    };

    const config = statusConfig[status] || statusConfig.available;

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
    <div className={styles.myDonations}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Donations</h1>
        <p className={styles.subtitle}>
          Track and manage all your food donations
        </p>
      </div>

      <div className={styles.donationsGrid}>
        {item.map((donation) => (
          <div key={donation.id} className={styles.donationCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <FiPackage />
              </div>
              {getStatusBadge(donation.status)}
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.donationTitle}>{donation.title}</h3>
              <p className={styles.donationDescription}>
                {donation.description}
              </p>

              <div className={styles.donationDetails}>
                <div className={styles.detailItem}>
                  <FiPackage className={styles.detailIcon} />
                  <span>{donation.quantity}</span>
                </div>
                <div className={styles.detailItem}>
                  <FiMapPin className={styles.detailIcon} />
                  <span>{donation.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <FiCalendar className={styles.detailIcon} />
                  <span>
                    {new Date(donation.expiry_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Display image if available */}
              {donation.imageurl && (
                <div className={styles.imagePreview}>
                  <img
                    src={donation.imageurl}
                    alt={donation.title}
                    className={styles.donationImageSmall}
                  />
                </div>
              )}
            </div>

            <div className={styles.cardActions}>
              <button
                className={styles.viewButton}
                onClick={() => handleViewDetails(donation)}
              >
                View Details
              </button>

              <button
                className={styles.editButton}
                onClick={() => openEditModal(donation)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {item.length === 0 && (
        <div className={styles.emptyState}>
          <FiPackage className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No donations yet</h3>
          <p className={styles.emptyDescription}>
            Start making a difference by creating your first donation
          </p>
          <button className={styles.createButton}>Create Donation</button>
        </div>
      )}

      {/* Donation Details Modal */}
      <DonationDetailsModal
        donation={selectedDonation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Edit Donation Modal */}
      <EditDonationModal
        isOpen={editmodel}
        onClose={closeEditModal}
        setFormData={setFormData}
        formData={formData}
        handleedit={handleedit}
        id={editDonationId}
      />
    </div>
  );
}
