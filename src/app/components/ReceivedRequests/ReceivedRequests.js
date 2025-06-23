"use client";

import { FiCheckCircle, FiX, FiClock, FiMapPin, FiUser } from "react-icons/fi";
import styles from "./ReceivedRequests.module.css";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";

export default function ReceivedRequests() {
  const [requests, setRequests] = useState([]);

  const handleapprove = async (requestId) => {
    try {
      const response = await axiosInstance.patch(
        `/${requestId}/approveRequest`
      );
      console.log("Request approved successfully:", response.data);
      alert("Request approved successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handlereject = async (requestId) => {
    try {
      const response = await axiosInstance.patch(`/${requestId}/rejectRequest`);
      console.log("Request rejected successfully:", response.data);
      alert("Request rejected successfully!");
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error(error);
    }
  };

  const getngorequest = async () => {
    try {
      const response = await axiosInstance.get("/donarreceviedrequest");

      setRequests(response.data.total_requested);
      console.log("Received requests fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching received requests:", error);
    }
  };

  useEffect(() => {
    getngorequest();
  }, []);

  const getUrgencyBadge = (urgency) => {
    const urgencyConfig = {
      high: { color: "#ff6b6b", bg: "#ff6b6b20", text: "Urgent" },
      medium: { color: "#f093fb", bg: "#f093fb20", text: "Medium" },
      low: { color: "#43e97b", bg: "#43e97b20", text: "Low" },
    };

    const config = urgencyConfig[urgency] || urgencyConfig.medium;

    return (
      <span
        className={styles.urgencyBadge}
        style={{
          color: config.color,
          backgroundColor: config.bg,
        }}
      >
        {config.text}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "#f093fb", bg: "#f093fb20", text: "Pending" },
      approved: { color: "#43e97b", bg: "#43e97b20", text: "Approved" },
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
    <div className={styles.receivedRequests}>
      <div className={styles.header}>
        <h1 className={styles.title}>Received Requests</h1>
        <p className={styles.subtitle}>NGO requests for your donations</p>
      </div>

      <div className={styles.requestsList}>
        {requests.map((request) => (
          <div key={request.request_id} className={styles.requestCard}>
            <div className={styles.cardHeader}>
              <div className={styles.ngoInfo}>
                <div className={styles.ngoIcon}>
                  <FiUser />
                </div>
                <div className={styles.ngoDetails}>
                  <h3 className={styles.ngoName}>{request.ngoname}</h3>
                  <p className={styles.donationTitle}>
                    Requested: {request.title}
                  </p>
                  <p className={styles.donationTitle}>
                    description: {request.description}
                  </p>
                </div>
              </div>
              <div className={styles.badges}>
                {getStatusBadge(request.status)}
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.requestInfo}>
                <div className={styles.infoItem}>
                  <FiClock className={styles.infoIcon} />
                  <span>
                    Requested on{" "}
                    {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {request.status === "pending" && (
              <div className={styles.cardActions}>
                <button
                  className={styles.rejectButton}
                  onClick={() => {
                    handlereject(request.request_id);
                  }}
                >
                  <FiX />
                  Reject
                </button>
                <button
                  className={styles.approveButton}
                  onClick={() => {
                    handleapprove(request.request_id);
                  }}
                >
                  <FiCheckCircle />
                  Approve
                </button>
              </div>
            )}

            {request.status === "approved" && (
              <div className={styles.approvedMessage}>
                <FiCheckCircle className={styles.approvedIcon} />
                <span>Request approved - NGO will contact you for pickup</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className={styles.emptyState}>
          <FiClock className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No requests yet</h3>
          <p className={styles.emptyDescription}>
            NGO requests for your donations will appear here
          </p>
        </div>
      )}
    </div>
  );
}
