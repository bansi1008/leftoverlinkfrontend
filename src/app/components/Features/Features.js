"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaUpload,
  FaSearch,
  FaHandshake,
  FaUsers,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";
import styles from "./Features.module.css";

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const howItWorksSteps = [
    {
      icon: FaUpload,
      title: "Post Your Donation",
      description:
        "Donors upload details and images of surplus food items with location and pickup times.",
      color: "#059669",
      image: "/img_2_leftoverlink.jpg",
    },
    {
      icon: FaSearch,
      title: "NGOs Browse & Request",
      description:
        "NGOs search available donations by location and submit requests for needed items.",
      color: "#3b82f6",
      image: "/img_3_leftoverlink.jpg",
    },
    {
      icon: FaHandshake,
      title: "Smart Approval System",
      description:
        "Donors approve one request and others are automatically rejected to ensure efficient distribution.",
      color: "#ef4444",
      image: "/img_4_leftoverlink.jpg",
    },
  ];

  const features = [
    {
      icon: FaUsers,
      title: "Role-Based Authentication",
      description:
        "Secure login system with OTP verification for both donors and NGOs.",
      gradient: "linear-gradient(135deg, #059669, #10b981)",
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Reliable",
      description:
        "Built with Node.js, PostgreSQL, and Redis for maximum security and performance.",
      gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    },
    {
      icon: FaGlobe,
      title: "Real-time Updates",
      description:
        "Live notifications and updates ensure seamless communication between all parties.",
      gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    },
  ];

  return (
    <section className={styles.features}>
      {/* How It Works Section */}
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            Simple steps to make a meaningful impact in your community
          </p>
        </motion.div>

        <motion.div
          className={styles.stepsContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.stepCard}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.stepNumber}>{index + 1}</div>

              <div className={styles.stepImageContainer}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={300}
                  height={200}
                  className={styles.stepImage}
                />
                <div
                  className={styles.stepIconOverlay}
                  style={{ background: step.color }}
                >
                  <step.icon className={styles.stepIcon} />
                </div>
              </div>

              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {index < howItWorksSteps.length - 1 && (
                <div className={styles.stepConnector}>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 30L40 30M40 30L35 25M40 30L35 35"
                      stroke="#d1d5db"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Platform Features Section */}
      <div className={styles.featuresSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>Platform Features</h2>
            <p className={styles.sectionSubtitle}>
              Powerful tools designed to make food donation simple and effective
            </p>
          </motion.div>

          <motion.div
            className={styles.featuresGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={styles.featureIcon}
                  style={{ background: feature.gradient }}
                >
                  <feature.icon />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Impact Statistics */}
      <motion.div
        className={styles.impactSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <div className={styles.impactContent}>
            <div className={styles.impactText}>
              <h2 className={styles.impactTitle}>Making Real Impact</h2>
              <p className={styles.impactDescription}>
                Every donation matters. Together, we're building a community
                where surplus food reaches those who need it most, reducing
                waste and hunger one meal at a time.
              </p>
            </div>

            <div className={styles.impactStats}>
              <motion.div
                className={styles.impactStat}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className={styles.impactNumber}>85%</span>
                <span className={styles.impactLabel}>Food Waste Reduction</span>
              </motion.div>

              <motion.div
                className={styles.impactStat}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className={styles.impactNumber}>2.5K+</span>
                <span className={styles.impactLabel}>Lives Touched</span>
              </motion.div>

              <motion.div
                className={styles.impactStat}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className={styles.impactNumber}>95%</span>
                <span className={styles.impactLabel}>User Satisfaction</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
