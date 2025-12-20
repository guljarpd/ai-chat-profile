"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Signup failed");
      return;
    }

    router.push("/chat");
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>
          Sign up to start chatting with memory
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.row}>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <div style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => router.push("/login")}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

/* ---------------------------------- */
/* Styles */
/* ---------------------------------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7f7f8",
    padding: "16px",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 700,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    marginBottom: "12px",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#000",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: {
    background: "#fee",
    color: "#b00020",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "13px",
    textAlign: "center",
  },
  footer: {
    marginTop: "14px",
    fontSize: "14px",
    textAlign: "center",
    color: "#555",
  },
  link: {
    color: "#000",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "underline",
  },
};
