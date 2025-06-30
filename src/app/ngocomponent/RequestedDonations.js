"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../app/utils/axiosInstance";
import styles from "./RequestedDonations.module.css";

export default function RequestedDonations() {
  const [requestedData, setRequestedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handlecancle = async (id) => {
    try {
      const res = await axiosInstance.patch(`${id}/cancelrequest`);
      if (res.status === 200) {
        console.log("Success!", res.data.message);
        // Remove the cancelled request from the UI
        setRequestedData((prev) => prev.filter((item) => item.id !== id));
        setFilteredData((prev) => prev.filter((item) => item.id !== id));
        alert("Request cancelled successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to cancel request. Please try again.");
    }
  };

  const handleRequestedData = async () => {
    try {
      setLoading(true);
      // Replace with actual API endpoint for requested donations
      const res = await axiosInstance.get("/ngototalrequested");
      if (!res.ok && !res.data) {
        console.log("error fetching requested donations");
        return;
      }
      setRequestedData(res.data.total_requested);
      setFilteredData(res.data.total_requested);
      console.log("requested data", res.data.total_requested);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search function
  useEffect(() => {
    let filtered = [...requestedData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.donorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [requestedData, searchTerm, statusFilter, sortBy]);

  useEffect(() => {
    handleRequestedData();
  }, []);

  // Get unique values for filter options
  const statuses = [...new Set(requestedData.map((item) => item.status))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: "#10b981",
      mobil: "#3b82f6",
      cloth: "#8b5cf6",
      electronics: "#f59e0b",
      books: "#ef4444",
      toys: "#ec4899",
      furniture: "#6366f1",
      default: "#6b7280",
    };
    return colors[category] || colors.default;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      approved: "#10b981",
      rejected: "#ef4444",
      default: "#6b7280",
    };
    return colors[status] || colors.default;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: "⏳",
      approved: "✅",
      rejected: "❌",
      default: "📄",
    };
    return icons[status] || icons.default;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your requests...</p>
      </div>
    );
  }

  return (
    <div className={styles.requestedDonations}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>My Donation Requests</h1>
          <p className={styles.subtitle}>
            Track and manage your donation requests and their status
          </p>
        </div>
        <div className={styles.statsCards}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📋</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{requestedData.length}</div>
              <div className={styles.statLabel}>Total Requests</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {
                  requestedData.filter((item) => item.status === "approved")
                    .length
                }
              </div>
              <div className={styles.statLabel}>Approved</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏳</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {
                  requestedData.filter((item) => item.status === "pending")
                    .length
                }
              </div>
              <div className={styles.statLabel}>Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>🔍</div>
          <input
            type="text"
            placeholder="Search your requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        Showing {filteredData.length} of {requestedData.length} requests
      </div>

      {/* Requests Grid */}
      <div className={styles.requestsGrid}>
        {filteredData.length === 0 ? (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📭</div>
            <h3>No requests found</h3>
            <p>You haven't made any donation requests yet</p>
          </div>
        ) : (
          filteredData.map((item) => (
            <div key={item.id} className={styles.requestCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardImage}>
                  {item.imageurl ? (
                    <img src={item.imageurl} alt={item.title} />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <span>📦</span>
                    </div>
                  )}
                </div>
                <div
                  className={styles.categoryTag}
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                >
                  {item.category}
                </div>
                <div
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(item.status) }}
                >
                  <span className={styles.statusIcon}>
                    {getStatusIcon(item.status)}
                  </span>
                  <span className={styles.statusText}>{item.status}</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>

                <div className={styles.cardDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📦</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📍</span>
                    <span>{item.location}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📅</span>
                    <span>Requested: {formatDate(item.created_at)}</span>
                  </div>
                </div>

                <div className={styles.donorInfo}>
                  <div className={styles.donorAvatar}>
                    {item.profileimageurl ? (
                      <img src={item.profileimageurl} alt={item.donorname} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {item.donorname.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={styles.donorDetails}>
                    <span className={styles.donorname}>{item.donorname}</span>
                    <span className={styles.donorLabel}>Donor</span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  {item.status === "pending" && (
                    <button
                      className={styles.cancelButton}
                      onClick={() => handlecancle(item.id)}
                    >
                      Cancel Request
                    </button>
                  )}
                  {item.status === "approved" && (
                    <button className={styles.contactButton}>
                      Contact Donor
                    </button>
                  )}
                  <button className={styles.viewButton}>View Details</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
