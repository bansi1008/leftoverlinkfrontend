"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import Modal from "../Modal/Modal";
import styles from "./OTPModal.module.css";

const OTPModal = ({ isOpen, onClose, email, onVerifySuccess }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleotp = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/v1/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      // Success
      onVerifySuccess();
      handleClose();
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setResendCooldown(60); // 60 second cooldown
      setOtp(["", "", "", "", "", ""]); // Clear current OTP
    } catch (error) {
      console.error("Resend OTP error:", error);
      setError(error.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setResendCooldown(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Verify Your Email">
      <div className={styles.otpModal}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.iconWrapper}>
            <FaEnvelope className={styles.emailIcon} />
          </div>
          <h3 className={styles.title}>Check Your Email</h3>
          <p className={styles.subtitle}>
            We've sent a 6-digit verification code to
            <span className={styles.email}>{email}</span>
          </p>
        </motion.div>

        <motion.form
          className={styles.form}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={styles.otpContainer}>
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={styles.otpInput}
                maxLength="1"
                pattern="[0-9]"
                inputMode="numeric"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              />
            ))}
          </div>

          {error && (
            <motion.div
              className={styles.error}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className={styles.verifyButton}
            disabled={isLoading || otp.join("").length !== 6}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleotp}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              <>
                <FaCheckCircle className={styles.buttonIcon} />
                Verify Email
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          className={styles.resendSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className={styles.resendText}>Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResendOTP}
            className={styles.resendButton}
            disabled={resendCooldown > 0 || isLoading}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend Code"}
          </button>
        </motion.div>
      </div>
    </Modal>
  );
};

export default OTPModal;
