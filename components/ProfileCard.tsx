import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ProfileCard({ content }: { content: string }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
          fontWeight: 600,
        }}
      >
        🪞 About You
      </div>

      {/* Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto", // 🔑
          padding: "16px",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#111827",
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
