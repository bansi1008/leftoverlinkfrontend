"use client";
import { useState } from "react";
import styles from "./NGONavbar.module.css";

export default function NGONavbar({ onNavigate, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    if (onNavigate) {
      onNavigate(section);
    }
    setIsMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <img
            src="/logo_leftoverlink.jpg"
            alt="LeftoverLink Logo"
            className={styles.logo}
          />
          <span className={styles.brandName}>LeftoverLink</span>
          <span className={styles.userType}>NGO Portal</span>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${
              activeSection === "dashboard" ? styles.activeNavLink : ""
            }`}
            onClick={() => handleNavClick("dashboard")}
          >
            <span className={styles.navIcon}>🏠</span>
            Dashboard
          </button>
          <button
            className={`${styles.navLink} ${
              activeSection === "donations" ? styles.activeNavLink : ""
            }`}
            onClick={() => handleNavClick("donations")}
          >
            <span className={styles.navIcon}>🍽️</span>
            Donations
          </button>
          <button
            className={`${styles.navLink} ${
              activeSection === "requests" ? styles.activeNavLink : ""
            }`}
            onClick={() => handleNavClick("requests")}
          >
            <span className={styles.navIcon}>📋</span>
            My Requests
          </button>
          <button
            className={`${styles.navLink} ${
              activeSection === "impact" ? styles.activeNavLink : ""
            }`}
            onClick={() => handleNavClick("impact")}
          >
            <span className={styles.navIcon}>📊</span>
            Impact
          </button>
        </div>

        {/* User Profile Section */}
        <div className={styles.userSection}>
          <div className={styles.notifications}>
            <span className={styles.notificationIcon}>🔔</span>
            <span className={styles.notificationBadge}>3</span>
          </div>
          <div className={styles.userProfile}>
            <img
              src="/img_1_leftoverlink.jpg"
              alt="NGO Profile"
              className={styles.profilePic}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>FoodShare NGO</span>
              <span className={styles.userRole}>Verified Organization</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <button
            className={`${styles.mobileNavLink} ${
              activeSection === "dashboard" ? styles.activeMobileNavLink : ""
            }`}
            onClick={() => handleNavClick("dashboard")}
          >
            <span className={styles.navIcon}>🏠</span>
            Dashboard
          </button>
          <button
            className={`${styles.mobileNavLink} ${
              activeSection === "donations" ? styles.activeMobileNavLink : ""
            }`}
            onClick={() => handleNavClick("donations")}
          >
            <span className={styles.navIcon}>🍽️</span>
            Donations
          </button>
          <button
            className={`${styles.mobileNavLink} ${
              activeSection === "requests" ? styles.activeMobileNavLink : ""
            }`}
            onClick={() => handleNavClick("requests")}
          >
            <span className={styles.navIcon}>📋</span>
            My Requests
          </button>
          <button
            className={`${styles.mobileNavLink} ${
              activeSection === "impact" ? styles.activeMobileNavLink : ""
            }`}
            onClick={() => handleNavClick("impact")}
          >
            <span className={styles.navIcon}>📊</span>
            Impact
          </button>
        </div>
      )}
    </nav>
  );
}
