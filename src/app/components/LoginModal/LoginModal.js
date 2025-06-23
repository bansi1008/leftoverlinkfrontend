"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";
import Modal from "../Modal/Modal";
import styles from "./LoginModal.module.css";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import axiosInstance from "../../utils/axiosInstance";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Submitting login data:", formData.email);
      const response = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      useAuthStore.getState().setUser(data.user);
      onLoginSuccess(data.user);

      setFormData({
        email: "",
        password: "",
      });
      if (data.user.role === "donor") {
        router.push("/dashboard/donor");
      } else if (data.user.role === "ngo") {
        router.push("/dashboard/ngo");
      } else {
        router.push("/");
      }
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setFormData({
      email: "",
      password: "",
    });
    setError("");
    setShowPassword(false);
    onClose();
  };

  const handleForgotPassword = () => {
    // You can implement forgot password functionality here
    alert("Forgot password functionality will be implemented soon!");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} title="Welcome Back">
      <div className={styles.loginModal}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.iconWrapper}>
            <FaUser className={styles.userIcon} />
          </div>
          <h3 className={styles.title}>Sign In to LeftoverLink</h3>
          <p className={styles.subtitle}>
            Enter your credentials to access your account
          </p>
        </motion.div>

        <motion.form
          className={styles.form}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
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
                placeholder="Enter your password"
                className={styles.input}
                required
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

          {error && (
            <motion.div
              className={styles.error}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <div className={styles.forgotPassword}>
            <button
              type="button"
              onClick={handleForgotPassword}
              className={styles.forgotLink}
            >
              Forgot your password?
            </button>
          </div>

          <motion.button
            type="button"
            onClick={handleLogin}
            className={styles.loginButton}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              <>
                <FaSignInAlt className={styles.buttonIcon} />
                Sign In
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          className={styles.signupPrompt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className={styles.promptText}>
            Don't have an account?
            <button
              type="button"
              className={styles.signupLink}
              onClick={onClose} // Close login modal so user can access signup
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </Modal>
  );
};

export default LoginModal;
