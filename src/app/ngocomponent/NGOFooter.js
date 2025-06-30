"use client";
import styles from "./NGOFooter.module.css";

export default function NGOFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <img
                src="/logo_leftoverlink.jpg"
                alt="LeftoverLink Logo"
                className={styles.footerLogo}
              />
              <span className={styles.brandName}>LeftoverLink</span>
            </div>
            <p className={styles.brandDescription}>
              Connecting generous donors with NGOs to reduce food waste and
              fight hunger. Together, we're building a sustainable future where
              no food goes to waste.
            </p>
            <div className={styles.impactStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50K+</span>
                <span className={styles.statLabel}>Meals Saved</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>NGOs Connected</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>2K+</span>
                <span className={styles.statLabel}>Active Donors</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#donations" className={styles.footerLink}>
                  Browse Donations
                </a>
              </li>
              <li>
                <a href="#requests" className={styles.footerLink}>
                  My Requests
                </a>
              </li>
              <li>
                <a href="#impact" className={styles.footerLink}>
                  Impact Dashboard
                </a>
              </li>
              <li>
                <a href="#profile" className={styles.footerLink}>
                  NGO Profile
                </a>
              </li>
              <li>
                <a href="#settings" className={styles.footerLink}>
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.linkSection}>
            <h4 className={styles.sectionTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#help" className={styles.footerLink}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.footerLink}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#guidelines" className={styles.footerLink}>
                  NGO Guidelines
                </a>
              </li>
              <li>
                <a href="#training" className={styles.footerLink}>
                  Training Resources
                </a>
              </li>
              <li>
                <a href="#community" className={styles.footerLink}>
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Get in Touch</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <span>ngo-support@leftoverlink.org</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span>+1 (555) 123-FOOD</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>123 Community St, Food City, FC 12345</span>
              </div>
            </div>

            {/* Social Media */}
            <div className={styles.socialSection}>
              <h5 className={styles.socialTitle}>Follow Us</h5>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>
                  📘
                </a>
                <a href="#" className={styles.socialLink}>
                  🐦
                </a>
                <a href="#" className={styles.socialLink}>
                  📸
                </a>
                <a href="#" className={styles.socialLink}>
                  💼
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © 2024 LeftoverLink. All rights reserved. Making a difference, one
              meal at a time.
            </p>
            <div className={styles.bottomLinks}>
              <a href="#privacy" className={styles.bottomLink}>
                Privacy Policy
              </a>
              <a href="#terms" className={styles.bottomLink}>
                Terms of Service
              </a>
              <a href="#cookies" className={styles.bottomLink}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
