"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../app/utils/axiosInstance";
import styles from "./Dashboard.module.css";
import DonationModal from "./DonationModal";

export default function AvailableDonations() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setmsg] = useState(null);

  const handlerequest = async (id) => {
    try {
      const res = await axiosInstance.post(`${id}/requestdonation`);
      console.log(res.data.message);
    } catch (error) {
      console.log("hmm, it's alredy there");
    } finally {
    }
  };

  const handleData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/donation");
      if (!res.ok && !res.data) {
        console.log("error fetching data");
        return;
      }
      setData(res.data);
      setFilteredData(res.data);
      console.log("data", res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search function
  useEffect(() => {
    let filtered = [...data];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((item) => item.location === locationFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.expiry_date) - new Date(a.expiry_date);
        case "oldest":
          return new Date(a.expiry_date) - new Date(b.expiry_date);
        case "quantity-high":
          return b.quantity - a.quantity;
        case "quantity-low":
          return a.quantity - b.quantity;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [data, searchTerm, categoryFilter, locationFilter, sortBy]);

  useEffect(() => {
    handleData();
  }, []);

  // Get unique values for filter options
  const categories = [...new Set(data.map((item) => item.category))];
  const locations = [...new Set(data.map((item) => item.location))];

  const getCategoryColor = (category) => {
    const colors = {
      food: "#10b981",
      mobil: "#3b82f6",
      clothing: "#8b5cf6",
      electronics: "#f59e0b",
      books: "#ef4444",
      toys: "#ec4899",
      furniture: "#6366f1",
      default: "#6b7280",
    };
    return colors[category] || colors.default;
  };

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) {
      return {
        status: "no-expiry",
        days: null,
        color: "#6b7280",
        text: "No expiry date",
      };
    }

    const now = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0)
      return {
        status: "expired",
        days: Math.abs(daysUntilExpiry),
        color: "#ef4444",
      };
    if (daysUntilExpiry <= 7)
      return { status: "urgent", days: daysUntilExpiry, color: "#f59e0b" };
    if (daysUntilExpiry <= 30)
      return { status: "soon", days: daysUntilExpiry, color: "#3b82f6" };
    return { status: "good", days: daysUntilExpiry, color: "#10b981" };
  };

  const openModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDonation(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading donations...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Available Donations</h1>
          <p className={styles.subtitle}>
            Discover and manage food donations from generous donors in your
            community
          </p>
        </div>
        <div className={styles.statsCards}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📦</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{data.length}</div>
              <div className={styles.statLabel}>Total Donations</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🍽️</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>
                {data.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
              <div className={styles.statLabel}>Total Items</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📍</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{locations.length}</div>
              <div className={styles.statLabel}>Locations</div>
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
            placeholder="Search donations, donors, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
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
            <option value="quantity-high">Highest Quantity</option>
            <option value="quantity-low">Lowest Quantity</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        Showing {filteredData.length} of {data.length} donations
      </div>

      {/* Donations Grid */}
      <div className={styles.donationsGrid}>
        {filteredData.length === 0 ? (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📭</div>
            <h3>No donations found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          filteredData.map((item) => {
            const expiryInfo = getExpiryStatus(item.expiry_date);
            return (
              <div key={item.id} className={styles.donationCard}>
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
                      <span className={styles.detailIcon}>⏰</span>
                      <span
                        className={styles.expiryStatus}
                        style={{ color: expiryInfo.color }}
                      >
                        {expiryInfo.status === "no-expiry"
                          ? expiryInfo.text
                          : expiryInfo.status === "expired"
                          ? `Expired ${expiryInfo.days} days ago`
                          : expiryInfo.status === "urgent"
                          ? `${expiryInfo.days} days left`
                          : expiryInfo.status === "soon"
                          ? `${expiryInfo.days} days left`
                          : `${expiryInfo.days} days left`}
                      </span>
                    </div>
                  </div>

                  <div className={styles.donorInfo}>
                    <div className={styles.donorAvatar}>
                      {item.profileimageurl ? (
                        <img src={item.profileimageurl} alt={item.name} />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className={styles.donorDetails}>
                      <span className={styles.donorName}>{item.name}</span>
                      <span className={styles.donorLabel}>Donor</span>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      className={styles.requestButton}
                      onClick={() => handlerequest(item.id)}
                    >
                      Request Donation
                    </button>
                    <button
                      className={styles.viewButton}
                      onClick={() => openModal(item)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Donation Details Modal */}
      <DonationModal
        isOpen={isModalOpen}
        donation={selectedDonation}
        onClose={closeModal}
        getCategoryColor={getCategoryColor}
        getExpiryStatus={getExpiryStatus}
        handleData={handleData}
      />
    </>
  );
}
