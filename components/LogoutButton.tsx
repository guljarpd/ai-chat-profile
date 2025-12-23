"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.replace("/login");
  };

  return (
    <button
      onClick={logout}
      style={{
        border: "1px solid #e5e7eb",
        background: "#fff",
        borderRadius: "8px",
        padding: "6px 10px",
        cursor: "pointer",
        color: "#dc2626",
      }}
    >
      Logout
    </button>
  );
}
