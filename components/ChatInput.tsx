import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (v: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!value.trim()) return;
        onSend(value);
        setValue("");
      }}
      style={{
        display: "flex",
        gap: "8px",
        marginTop: "16px",
      }}
    >
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Ask something…"
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #cbd5f5",
          fontSize: "14px",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "0 18px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </form>
  );
}
