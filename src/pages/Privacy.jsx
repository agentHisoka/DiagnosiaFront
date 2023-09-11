import React from "react";

function PrivacyPolicy() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Privacy Policy</h1>
      <div style={styles.ppContainer}>
        <p style={styles.ppP}>
          At [Your Website Name], we take your privacy seriously. This Privacy
          Policy describes how we collect, use, disclose, and safeguard your
          personal information. By accessing or using our services, you consent
          to the practices described in this Privacy Policy.
        </p>
        <h2 style={styles.ppSubTitle}>Information We Collect</h2>
        <p style={styles.ppP}>
          We may collect personal information that you provide directly to us,
          such as your name, email address, and any other information you choose
          to provide when you interact with our website or services.
        </p>
        <h2 style={styles.ppSubTitle}>How We Use Your Information</h2>
        <p style={styles.ppP}>
          We may use the information we collect for various purposes, including
          to:
        </p>
        <ul style={styles.ppList}>
          <li>Provide, maintain, and improve our services.</li>
          <li>Process transactions and send transaction notifications.</li>
          <li>Respond to your comments, questions, and requests.</li>
          <li>Send emails and updates about our services.</li>
        </ul>
        <h2 style={styles.ppSubTitle}>Information Sharing</h2>
        <p style={styles.ppP}>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information with trusted service providers
          who assist us in operating our website or servicing you.
        </p>
        <h2 style={styles.ppSubTitle}>Security</h2>
        <p style={styles.ppP}>
          We take reasonable measures to help protect your personal information
          from unauthorized access, use, or disclosure. However, no data
          transmission over the internet or information storage technology can
          be guaranteed to be completely secure.
        </p>
        <h2 style={styles.ppSubTitle}>Changes to This Privacy Policy</h2>
        <p style={styles.ppP}>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the date of the latest revision will be
          indicated at the top of the page.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "20px auto",
    maxWidth: "600px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "rgba(0, 128, 0, 0.1)", // Green background with opacity
  },
  title: {
    fontSize: "32px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#2E8B57", // Dark green text color
  },
  ppContainer: {
    marginBottom: "20px",
  },
  ppP: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#000", // Black text color
  },
  // Add more styles as needed
};

export default PrivacyPolicy;
