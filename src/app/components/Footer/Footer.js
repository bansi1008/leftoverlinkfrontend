"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaHandsHelping,
  FaUsers,
  FaQuestionCircle,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const quickLinks = [
    { href: "/about", label: "About Us", icon: FaUsers },
    { href: "/how-it-works", label: "How It Works", icon: FaQuestionCircle },
    { href: "/donations", label: "Donations", icon: FaHeart },
    { href: "/contact", label: "Contact", icon: FaEnvelope },
    { href: "/faq", label: "FAQs", icon: FaQuestionCircle },
    { href: "/terms", label: "Terms & Conditions", icon: null },
    { href: "/privacy", label: "Privacy Policy", icon: null },
  ];

  const userLinks = [
    { href: "/ngo-signup", label: "NGO Signup", icon: FaHandsHelping },
    { href: "/donor-info", label: "Donor Information", icon: FaHeart },
    { href: "/volunteer", label: "Become a Volunteer", icon: FaUsers },
    { href: "/partner", label: "Partner With Us", icon: FaHandsHelping },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
    { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
    { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      text: "leftoverlink01@gmail.com",
      link: "leftoverlink01@gmail.com",
    },
    { icon: FaPhone, text: "+44 (0)7999083962", link: "tel:+15551234567" },
    {
      icon: FaMapMarkerAlt,
      text: "newcastle, UK",
      link: null,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.footerContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div className={styles.brandSection} variants={itemVariants}>
            <Link href="/" className={styles.brandLink}>
              <Image
                src="/logo_leftoverlink.jpg"
                alt="LeftoverLink"
                width={150}
                height={50}
                className={styles.logo}
              />
            </Link>
            <p className={styles.brandDescription}>
              Connecting hearts, sharing hope. Transforming surplus food into
              meaningful impact for communities in need, one donation at a time.
            </p>

            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className={styles.linksSection} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={link.href} className={styles.footerLink}>
                    {link.icon && <link.icon className={styles.linkIcon} />}
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* User Links */}
          <motion.div className={styles.linksSection} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>For Users</h3>
            <ul className={styles.linksList}>
              {userLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={link.href} className={styles.footerLink}>
                    <link.icon className={styles.linkIcon} />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div className={styles.contactSection} variants={itemVariants}>
            <h3 className={styles.sectionTitle}>Contact Us</h3>
            <div className={styles.contactInfo}>
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className={styles.contactItem}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <contact.icon className={styles.contactIcon} />
                  {contact.link ? (
                    <a href={contact.link} className={styles.contactLink}>
                      {contact.text}
                    </a>
                  ) : (
                    <span className={styles.contactText}>{contact.text}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>Stay Updated</h4>
              <p className={styles.newsletterText}>
                Get the latest updates on food donations and impact stories.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                />
                <motion.button
                  className={styles.newsletterButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className={styles.footerBottom}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © 2025 LeftoverLink. All rights reserved. Made by Bansi Dobariya
            </p>

            <div className={styles.bottomLinks}>
              <Link href="/privacy" className={styles.bottomLink}>
                Privacy
              </Link>
              <Link href="/terms" className={styles.bottomLink}>
                Terms
              </Link>
              <Link href="/cookies" className={styles.bottomLink}>
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Background Elements */}
        <div className={styles.backgroundElements}>
          <motion.div
            className={styles.floatingElement1}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={styles.floatingElement2}
            animate={{
              y: [20, -20, 20],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
