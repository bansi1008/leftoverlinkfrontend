"use client";

import { useState } from "react";
import {
  FiPackage,
  FiPlus,
  FiInbox,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({
  children,
  userType,
  activeSection,
  onSectionChange,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Dashboard", icon: FiPackage },
    { id: "donations", label: "My Donations", icon: FiPackage },
    { id: "create", label: "Create Donation", icon: FiPlus },
    { id: "requests", label: "Received Requests", icon: FiInbox },
    { id: "profile", label: "Profile", icon: FiUser },
  ];

  const handleNavigation = (sectionId) => {
    onSectionChange(sectionId);
    setSidebarOpen(false); // Close mobile sidebar
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked");
    // For now, redirect to home page
    window.location.href = "/";
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.menuButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className={styles.mobileTitle}>
          {userType === "donor" ? "Donor Dashboard" : "NGO Dashboard"}
        </h1>
      </div>

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>
            {userType === "donor" ? "Donor Portal" : "NGO Portal"}
          </h2>
        </div>

        <nav className={styles.navigation}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`${styles.navItem} ${
                  activeSection === item.id ? styles.navItemActive : ""
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className={styles.navIcon} />
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            );
          })}

          <button
            className={`${styles.navItem} ${styles.logoutButton}`}
            onClick={handleLogout}
          >
            <FiLogOut className={styles.navIcon} />
            <span className={styles.navLabel}>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
