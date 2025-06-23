"use client";

import {
  FiPlus,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";
import styles from "./DashboardHome.module.css";
import useAuthStore from "../../store/authStore";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";

export default function DashboardHome({
  userType,
  onCreateDonation,
  onMydonation,
}) {
  const user = useAuthStore((state) => state.user);

  const [state, setState] = useState({});

  const states = async () => {
    try {
      const res = await axiosInstance.get("/state");
      setState(res.data);

      console.log("States fetched successfully:", res.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    states();
  }, []);

  const stats = {
    totalDonations: state.count,
    pendingRequests: state.totalpendingrequests,
    approvedRequests: state.approvedRequestsCount,
    totalImpact: 150, // number of people helped
  };

  const statCards = [
    {
      title: "Total Donations Made",
      value: stats.totalDonations,
      icon: FiPackage,
      color: "#667eea",
      trend: "+12%",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: FiClock,
      color: "#f093fb",
      trend: "+5%",
    },
    {
      title: "Approved Requests",
      value: stats.approvedRequests,
      icon: FiCheckCircle,
      color: "#4facfe",
      trend: "+18%",
    },
  ];

  return (
    <div className={styles.dashboardHome}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Hi {user?.name || "there"}, here's what's happening 👋
        </h1>
        <p className={styles.welcomeSubtitle}>
          Welcome back to your donor dashboard. Track your donations and make a
          difference.
        </p>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>Quick Overview</h2>
        <div className={styles.statsGrid}>
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div
                    className={styles.statIcon}
                    style={{
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    <Icon />
                  </div>
                  <span
                    className={styles.statTrend}
                    style={{ color: stat.color }}
                  >
                    {stat.trend}
                  </span>
                </div>
                <div className={styles.statContent}>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <p className={styles.statTitle}>{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Section */}
      <div className={styles.actionSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionCards}>
          <button
            className={styles.primaryActionCard}
            onClick={onCreateDonation}
          >
            <div className={styles.actionIcon}>
              <FiPlus />
            </div>
            <div className={styles.actionContent}>
              <h3 className={styles.actionTitle}>Create New Donation</h3>
              <p className={styles.actionDescription}>
                Share your leftover food with those in need
              </p>
            </div>
          </button>
          <button onClick={onMydonation}>
            <div className={styles.secondaryActionCard}>
              <div className={styles.actionIcon}>
                <FiPackage />
              </div>
              <div className={styles.actionContent}>
                <h3 className={styles.actionTitle}>View All Donations</h3>
                <p className={styles.actionDescription}>
                  Manage and track your donation history
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
    </div>
  );
}
