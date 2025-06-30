"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaHandsHelping, FaArrowRight, FaPlay } from "react-icons/fa";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import styles from "./Hero.module.css";

const Hero = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [userIntention, setUserIntention] = useState(null);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleDonateClick = () => {
    setUserIntention("donate");
    setIsLoginModalOpen(true);
  };

  const handleRequestClick = () => {
    setUserIntention("request");
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setIsLoginModalOpen(false);

    // Redirect based on user intention and role
    if (userIntention === "donate" && user.role === "donor") {
      // Redirect to donor dashboard
      window.location.href = "/dashboard/donor";
    } else if (userIntention === "request" && user.role === "ngo") {
      // Redirect to NGO dashboard
      window.location.href = "/dashboard/ngo";
    } else {
      // If user role doesn't match intention, show appropriate message
      if (userIntention === "donate" && user.role === "ngo") {
        alert(
          "NGOs cannot donate. Please login with a donor account or sign up as a donor."
        );
      } else if (userIntention === "request" && user.role === "donor") {
        alert(
          "Donors cannot request food. Please login with an NGO account or sign up as an NGO."
        );
      }
    }

    setUserIntention(null);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
    setUserIntention(null);
  };

  const handleSignUpModalClose = () => {
    setIsSignUpModalOpen(false);
    setUserIntention(null);
  };

  const handleNeedAccount = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.textContent}>
            <motion.div className={styles.badge} variants={itemVariants}>
              <FaHeart className={styles.badgeIcon} />
              <span>Connecting Hearts, Sharing Hope</span>
            </motion.div>

            <motion.h1 className={styles.heading} variants={itemVariants}>
              Turn <span className={styles.highlight}>Leftovers</span> into{" "}
              <span className={styles.highlight}>Lifesavers</span>
            </motion.h1>

            <motion.p className={styles.subheading} variants={itemVariants}>
              Bridge the gap between food waste and hunger. Connect donors with
              NGOs to transform surplus food into meaningful impact for
              communities in need.
            </motion.p>

            <motion.div className={styles.stats} variants={itemVariants}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Meals Donated</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>NGO Partners</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Active Donors</span>
              </div>
            </motion.div>

            <motion.div className={styles.ctaButtons} variants={itemVariants}>
              <motion.button
                className={styles.primaryBtn}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDonateClick}
              >
                <FaHeart className={styles.btnIcon} />
                Donate Now
                <FaArrowRight className={styles.btnArrow} />
              </motion.button>

              <motion.button
                className={styles.secondaryBtn}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleRequestClick}
              >
                <FaHandsHelping className={styles.btnIcon} />
                Request Help
              </motion.button>

              <motion.button
                className={styles.videoBtn}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className={styles.playIconWrapper}>
                  <FaPlay className={styles.playIcon} />
                </div>
                <span>How it Works</span>
              </motion.button>
            </motion.div>
          </div>

          <div className={styles.imageContent}>
            <motion.div
              className={styles.imageWrapper}
              variants={imageVariants}
            >
              <div className={styles.imageContainer}>
                <Image
                  src="/img_1_leftoverlink.jpg"
                  alt="Food donation helping communities"
                  width={600}
                  height={400}
                  className={styles.heroImage}
                  priority
                />

                <motion.div
                  className={styles.floatingCard}
                  variants={floatingVariants}
                  animate="animate"
                >
                  <div className={styles.cardIcon}>
                    <FaHeart />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>Impact Made</span>
                    <span className={styles.cardValue}>2,500+ Lives</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className={styles.backgroundElements}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <div className={styles.circle1}></div>
              <div className={styles.circle2}></div>
              <div className={styles.circle3}></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleSignUpModalClose}
      />
    </section>
  );
};

export default Hero;
