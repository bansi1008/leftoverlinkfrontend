"use client";
import { useState } from "react";
import NGONavbar from "./NGONavbar";
import Dashboard from "./Dashboard";
import NGOFooter from "./NGOFooter";
import styles from "./NGOMainLayout.module.css";

export default function NGOMainLayout() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "donations":
        return <Dashboard initialTab="available" />;
      case "requests":
        return <Dashboard initialTab="requests" />;
      case "impact":
        return (
          <div className={styles.comingSoon}>
            <h2>Impact Dashboard</h2>
            <p>Coming Soon...</p>
          </div>
        );
      case "dashboard":
      default:
        return (
          <>
            {/* Hero Banner Section */}
            <section className={styles.heroBanner}>
              <div className={styles.heroContent}>
                <div className={styles.heroText}>
                  <h1 className={styles.heroTitle}>
                    Welcome to Your NGO Dashboard
                  </h1>
                  <p className={styles.heroSubtitle}>
                    Manage donations, track your impact, and connect with
                    generous donors to help fight food waste and hunger in your
                    community.
                  </p>
                  <div className={styles.heroStats}>
                    <div className={styles.heroStat}>
                      <span className={styles.statValue}>2,847</span>
                      <span className={styles.statLabel}>Meals Served</span>
                    </div>
                    <div className={styles.heroStat}>
                      <span className={styles.statValue}>156</span>
                      <span className={styles.statLabel}>Active Donations</span>
                    </div>
                    <div className={styles.heroStat}>
                      <span className={styles.statValue}>89%</span>
                      <span className={styles.statLabel}>Success Rate</span>
                    </div>
                  </div>
                </div>
                <div className={styles.heroImage}>
                  <img
                    src="/img_1_leftoverlink.jpg"
                    alt="Food donation helping community"
                    className={styles.heroImg}
                  />
                  <div className={styles.floatingCard}>
                    <span className={styles.cardIcon}>🎯</span>
                    <div className={styles.cardContent}>
                      <span className={styles.cardTitle}>Today's Goal</span>
                      <span className={styles.cardValue}>500 meals</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Highlights */}
            <section className={styles.impactSection}>
              <div className={styles.impactContainer}>
                <h2 className={styles.impactTitle}>Your Impact This Month</h2>
                <div className={styles.impactCards}>
                  <div className={styles.impactCard}>
                    <img
                      src="/img_2_leftoverlink.jpg"
                      alt="Food rescued"
                      className={styles.impactImage}
                    />
                    <div className={styles.impactInfo}>
                      <h3>Food Rescued</h3>
                      <p className={styles.impactNumber}>1,234 kg</p>
                      <p className={styles.impactDescription}>
                        Saved from waste and redistributed
                      </p>
                    </div>
                  </div>
                  <div className={styles.impactCard}>
                    <img
                      src="/img_3_leftoverlink.jpg"
                      alt="Families helped"
                      className={styles.impactImage}
                    />
                    <div className={styles.impactInfo}>
                      <h3>Families Helped</h3>
                      <p className={styles.impactNumber}>89 families</p>
                      <p className={styles.impactDescription}>
                        Received nutritious meals
                      </p>
                    </div>
                  </div>
                  <div className={styles.impactCard}>
                    <img
                      src="/img_4_leftoverlink.jpg"
                      alt="Partners connected"
                      className={styles.impactImage}
                    />
                    <div className={styles.impactInfo}>
                      <h3>Partners</h3>
                      <p className={styles.impactNumber}>23 donors</p>
                      <p className={styles.impactDescription}>
                        Active partnerships this month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className={styles.quickActions}>
              <div className={styles.actionsContainer}>
                <h2 className={styles.actionsTitle}>Quick Actions</h2>
                <div className={styles.actionCards}>
                  <div
                    className={styles.actionCard}
                    onClick={() => setActiveSection("donations")}
                  >
                    <div className={styles.actionIcon}>🔍</div>
                    <h3>Browse Donations</h3>
                    <p>Find available food donations in your area</p>
                  </div>
                  <div
                    className={styles.actionCard}
                    onClick={() => setActiveSection("requests")}
                  >
                    <div className={styles.actionIcon}>📋</div>
                    <h3>Track Requests</h3>
                    <p>Monitor your pending and approved requests</p>
                  </div>
                  <div
                    className={styles.actionCard}
                    onClick={() => setActiveSection("impact")}
                  >
                    <div className={styles.actionIcon}>📊</div>
                    <h3>View Impact</h3>
                    <p>See detailed analytics of your organization's impact</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Dashboard Content */}
            <section className={styles.dashboardSection}>
              <div className={styles.dashboardContainer}>
                <Dashboard />
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className={styles.mainLayout}>
      {/* Navigation Bar */}
      <NGONavbar onNavigate={handleNavigation} activeSection={activeSection} />

      {/* Dynamic Content */}
      {renderContent()}

      {/* Footer */}
      <NGOFooter />
    </div>
  );
}
