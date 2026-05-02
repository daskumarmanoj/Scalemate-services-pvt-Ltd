/* eslint-disable react/no-unescaped-entities */
// ============================================================
// QuoteModal.jsx
// White & Gold design — submits to Google Sheets via Apps Script
// Replace APPS_SCRIPT_URL with your deployed Web App URL
// ============================================================

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ STEP: Replace this with your deployed Apps Script Web App URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0iqVg7PbQhaavZ0E4hBnTosbqJArR-nj47k5sQNnsbPf7bJuJwMFCf04zIBn2Ze8TwA/exec";

// ─── Animation Variants ────────────────────────────────────────────────────────
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: -32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
};

// ─── Inline Styles (avoids Tailwind dependency issues) ────────────────────────
const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "1rem",
  },
  modal: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow:
      "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
    padding: "2rem 2rem 2.25rem",
    border: "1px solid #f0ece3",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
  },
  titleBlock: {},
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#c8a84b",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 600,
    marginBottom: "4px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#1a1a1a",
    margin: 0,
    lineHeight: 1.2,
  },
  closeBtn: {
    background: "none",
    border: "1px solid #e8e3d8",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#999",
    fontSize: "14px",
    flexShrink: 0,
    marginTop: "2px",
    transition: "all 0.15s",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, #c8a84b33, #c8a84b88, #c8a84b33)",
    marginBottom: "1.5rem",
    border: "none",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: "#1a1a1a",
    background: "#fafaf8",
    border: "1px solid #e8e3d8",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: "#1a1a1a",
    background: "#fafaf8",
    border: "1px solid #e8e3d8",
    borderRadius: "10px",
    outline: "none",
    resize: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #c8a84b 0%, #e8c96a 50%, #c8a84b 100%)",
    backgroundSize: "200% 200%",
    color: "#fff",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "4px",
    boxShadow: "0 4px 16px rgba(200,168,75,0.4)",
    transition: "opacity 0.2s, transform 0.15s, box-shadow 0.2s",
  },
  successBox: {
    textAlign: "center",
    padding: "2rem 1rem",
  },
  successIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #c8a84b, #e8c96a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
    fontSize: "24px",
    boxShadow: "0 4px 16px rgba(200,168,75,0.35)",
  },
  successTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: "8px",
  },
  successText: {
    fontSize: "14px",
    color: "#777",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    lineHeight: 1.6,
  },
  errorMsg: {
    fontSize: "13px",
    color: "#d9534f",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    textAlign: "center",
    marginTop: "8px",
  },
  loadingDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#fff",
    margin: "0 2px",
    animation: "bounce 0.8s infinite ease-in-out",
  },
};

// ─── Focus/Hover helpers ──────────────────────────────────────────────────────
const focusStyle = {
  borderColor: "#c8a84b",
  boxShadow: "0 0 0 3px rgba(200,168,75,0.15)",
  background: "#fff",
};

// ─── Reusable Field ───────────────────────────────────────────────────────────
function Field({ as: Tag = "input", ...props }) {
  const [focused, setFocused] = useState(false);
  const baseStyle = Tag === "textarea" ? styles.textarea : styles.input;
  return (
    <Tag
      {...props}
      style={{ ...baseStyle, ...(focused ? focusStyle : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    budget: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email) {
      setErrorMsg("Please fill in your name and email.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // required for Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // no-cors returns opaque response — assume success
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setForm({ fullName: "", phone: "", email: "", budget: "", service: "", message: "" });
      setErrorMsg("");
    }, 300);
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .quote-submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(200,168,75,0.5) !important;
        }
        .quote-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .quote-close-btn:hover {
          border-color: #c8a84b !important;
          color: #c8a84b !important;
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            style={styles.backdrop}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={styles.modal}
            >
              {/* ── Header ── */}
              <div style={styles.header}>
                <div style={styles.titleBlock}>
                  <p style={styles.eyebrow}>Free Consultation</p>
                  <h2 style={styles.title}>Get a Quote</h2>
                </div>
                <button
                  onClick={handleClose}
                  style={styles.closeBtn}
                  className="quote-close-btn"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <hr style={styles.divider} />

              {/* ── Success State ── */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={styles.successBox}
                >
                  <div style={styles.successIcon}>✓</div>
                  <p style={styles.successTitle}>Request Submitted!</p>
                  <p style={styles.successText}>
                    Thank you. We've received your details and will get back to
                    you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit}>
                  <div style={styles.fieldGroup}>
                    {/* Row 1: Name + Phone */}
                    <div style={styles.row}>
                      <Field
                        name="fullName"
                        type="text"
                        placeholder="Full Name *"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                      <Field
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Row 2: Email + Budget */}
                    <div style={styles.row}>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                      <Field
                        name="budget"
                        type="text"
                        placeholder="Budget Range"
                        value={form.budget}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Service Dropdown */}
                    <Field
                      as="select"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a Service</option>
                      <option value="Web Development">Web Development</option>
                      <option value="App Development">App Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                    </Field>

                    {/* Message */}
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Tell us about your project…"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Error */}
                  {errorMsg && <p style={styles.errorMsg}>{errorMsg}</p>}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={styles.submitBtn}
                    className="quote-submit-btn"
                  >
                    {status === "loading" ? (
                      <>
                        <span style={{ ...styles.loadingDot, animationDelay: "0s" }} />
                        <span style={{ ...styles.loadingDot, animationDelay: "0.15s" }} />
                        <span style={{ ...styles.loadingDot, animationDelay: "0.3s" }} />
                      </>
                    ) : (
                      "Submit Request →"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;