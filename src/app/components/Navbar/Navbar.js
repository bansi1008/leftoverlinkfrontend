"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUser, FaHeart } from "react-icons/fa";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null); // null, 'donor', 'ngo'
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/howitworks", label: "How It Works" },
    { href: "/donations", label: "Donations" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLoginSuccess = (user) => {
    setUserType(user.role);
    setIsLoginModalOpen(false);
    alert(`Welcome back, ${user.name}!`);
  };

  const getRoleBasedButtons = (isMobile = false) => {
    if (!userType) {
      return (
        <div className={styles.authButtons}>
          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              if (isMobile) setIsMenuOpen(false);
            }}
            className={styles.loginBtn}
          >
            <FaUser className={styles.icon} />
            Login
          </button>
          <button
            onClick={() => {
              setIsSignUpModalOpen(true);
              if (isMobile) setIsMenuOpen(false);
            }}
            className={styles.registerBtn}
          >
            Register
          </button>
        </div>
      );
    }

    if (userType === "donor") {
      return (
        <div className={styles.authButtons}>
          <Link href="/postdonation" className={styles.postDonationBtn}>
            <FaHeart className={styles.icon} />
            Post Donation
          </Link>
          <Link href="/mydonations" className={styles.userBtn}>
            My Donations
          </Link>
        </div>
      );
    }

    if (userType === "ngo") {
      return (
        <div className={styles.authButtons}>
          <Link href="/browse-donations" className={styles.browseBtn}>
            Browse Donations
          </Link>
          <Link href="/my-requests" className={styles.userBtn}>
            My Requests
          </Link>
        </div>
      );
    }
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/">
            <Image
              src="/logo_leftoverlink.jpg"
              alt="LeftoverLink"
              width={120}
              height={40}
              className={styles.logoImg}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {getRoleBasedButtons()}
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={styles.mobileNav}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className={styles.mobileNavLinks}>
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className={styles.mobileAuthButtons}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                {getRoleBasedButtons(true)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </motion.nav>
  );
};

export default Navbar;
