"use client";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import AvailableDonations from "./AvailableDonations";
import RequestedDonations from "./RequestedDonations";

export default function Dashboard({ initialTab = "available" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update activeTab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className={styles.dashboard}>
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "available" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("available")}
        >
          <span className={styles.tabIcon}>🍽️</span>
          Available Donations
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "requests" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("requests")}
        >
          <span className={styles.tabIcon}>📋</span>
          My Requests
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "available" ? (
          <AvailableDonations />
        ) : (
          <RequestedDonations />
        )}
      </div>
    </div>
  );
}
