"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaHandsHelping,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Modal from "../Modal/Modal";
import OTPModal from "../OTPModal/OTPModal";
import styles from "./SignUpModal.module.css";

const SignUpModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("role"); // 'role', 'form', or 'otp'
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prev) => ({ ...prev, role }));
    setStep("form");
  };

  const handleBackToRoleSelect = () => {
    setStep("role");
    setSelectedRole("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesignup = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 5) {
      alert("Password must be at least 5 characters long");
      return;
    }
    try {
      console.log("Submitting sign-up data:", formData.name);
      const response = await fetch("http://localhost:4000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmpassword,
          role: formData.role,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Sign-up failed");
      }

      // Success - Open OTP modal
      setIsOTPModalOpen(true);
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Sign-up failed. Please try again later.");
    }
  };

  const handleOTPVerifySuccess = () => {
    alert("Email verified successfully! Your account has been created.");
    // Reset everything and close all modals
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: "",
    });
    setStep("role");
    setSelectedRole("");
    setIsOTPModalOpen(false);
    onClose();
  };

  const handleOTPModalClose = () => {
    setIsOTPModalOpen(false);
    // Don't reset form data in case user wants to try again
  };

  const handleModalClose = () => {
    setStep("role");
    setSelectedRole("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: "",
    });
    setIsOTPModalOpen(false);
    onClose();
  };

  const roleOptions = [
    {
      role: "donor",
      title: "Sign up as Donor",
      description:
        "Share surplus food with NGOs and make a positive impact in your community.",
      icon: FaHeart,
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669, #10b981)",
    },
    {
      role: "ngo",
      title: "Sign up as NGO",
      description:
        "Access food donations to support your community programs and initiatives.",
      icon: FaHandsHelping,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
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
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const renderRoleSelection = () => (
    <motion.div
      className={styles.roleSelection}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.roleHeader} variants={itemVariants}>
        <h3 className={styles.roleTitle}>Choose Your Role</h3>
        <p className={styles.roleSubtitle}>
          Select how you'd like to participate in our food donation platform
        </p>
      </motion.div>

      <div className={styles.roleOptions}>
        {roleOptions.map((option, index) => (
          <motion.div
            key={option.role}
            className={styles.roleCard}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect(option.role)}
          >
            <div
              className={styles.roleIcon}
              style={{ background: option.gradient }}
            >
              <option.icon />
            </div>
            <h4 className={styles.roleCardTitle}>{option.title}</h4>
            <p className={styles.roleCardDescription}>{option.description}</p>

            <motion.div
              className={styles.roleCardButton}
              style={{ background: option.gradient }}
              whileHover={{ boxShadow: `0 8px 25px ${option.color}40` }}
            >
              Get Started
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderSignUpForm = () => (
    <motion.div
      className={styles.signUpForm}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.formHeader}>
        <button
          className={styles.backButton}
          onClick={handleBackToRoleSelect}
          type="button"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h3 className={styles.formTitle}>
            Sign up as {selectedRole === "donor" ? "Donor" : "NGO"}
          </h3>
          <p className={styles.formSubtitle}>
            Create your account to get started
          </p>
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              className={styles.input}
              required
              minLength="5"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmpassword" className={styles.label}>
            Confirm Password
          </label>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={styles.input}
              required
              minLength="5"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          className={styles.submitButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlesignup}
        >
          Create Account
        </motion.button>

        <p className={styles.loginPrompt}>
          Already have an account?
          <button
            type="button"
            className={styles.loginLink}
            onClick={() => {
              onClose(); // Close signup modal
              // You can add logic here to open login modal if needed
            }}
          >
            Sign In
          </button>
        </p>
      </form>
    </motion.div>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        title={step === "role" ? "Join LeftoverLink" : ""}
      >
        <div className={styles.modalContent}>
          {step === "role" ? renderRoleSelection() : renderSignUpForm()}
        </div>
      </Modal>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={handleOTPModalClose}
        email={formData.email}
        onVerifySuccess={handleOTPVerifySuccess}
      />
    </>
  );
};

export default SignUpModal;
