"use client";

import { useEffect, useRef, useState } from "react";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import ProfileCard from "@/components/ProfileCard";
import LogoutButton from "@/components/LogoutButton";
import { isProfileTrigger } from "@/constants";


type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: text }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ chatId, message: text }),
    });

    const data = await res.json();
    setChatId(data.chatId);

    // ✅ USE CONSTANT-BASED TRIGGER
    if (isProfileTrigger(text)) {
      setProfile(data.reply);
      setShowProfile(true); // mobile overlay
    }

    setMessages(prev => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100%",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "100%",
          display: "flex",
          gap: "24px",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        {/* DESKTOP PROFILE */}
        {profile && (
          <div
            className="profile-desktop"
            style={{ width: "320px", height: "100%", flexShrink: 0 }}
          >
            <ProfileCard content={profile} />
          </div>
        )}

        {/* CHAT */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            💬 Chat

            {profile && (
              <button
                className="profile-toggle"
                onClick={() => setShowProfile(true)}
                style={{
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                About You
              </button>
            )}
            <LogoutButton />
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
            }}
          >
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              {messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} content={m.content} />
              ))}

              {loading && (
                <div style={{ opacity: 0.6 }}>Assistant is typing…</div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              <ChatInput onSend={send} />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE PROFILE OVERLAY */}
      {profile && showProfile && (
        <div
          onClick={() => setShowProfile(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "90%",
              height: "85%",
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <ProfileCard content={profile} />
          </div>
        </div>
      )}
    </div>
  );
}
