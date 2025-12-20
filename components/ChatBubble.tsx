import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          maxWidth: "68%",
          padding: "10px 14px",
          borderRadius: isUser
            ? "14px 14px 4px 14px" // user bubble tail
            : "14px 14px 14px 4px", // assistant bubble tail
          backgroundColor: isUser ? "#2563eb" : "#f1f5f9",
          color: isUser ? "#ffffff" : "#0f172a",
          fontSize: "14px",
          lineHeight: 1.5,
          wordBreak: "break-word",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p({ children }) {
              return <p style={{ margin: 0 }}>{children}</p>;
            },
            code({ inline, children }) {
              return inline ? (
                <code
                  style={{
                    background: "#e2e8f0",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    color: "#0f172a",
                  }}
                >
                  {children}
                </code>
              ) : (
                <pre
                  style={{
                    background: "#0f172a",
                    color: "#e5e7eb",
                    padding: "12px",
                    borderRadius: "8px",
                    overflowX: "auto",
                    fontSize: "13px",
                    marginTop: "8px",
                  }}
                >
                  <code>{children}</code>
                </pre>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
