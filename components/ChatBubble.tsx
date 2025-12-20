import ReactMarkdown from "react-markdown";

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
          maxWidth: "80%",
          background: isUser ? "#2563eb" : "#f1f5f9",
          color: isUser ? "#fff" : "#0f172a",
          padding: "10px 14px",
          borderRadius: "14px",
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          lineHeight: 1.5,
        }}
      >
        <ReactMarkdown
          components={{
            p({ children }) {
              return <p style={{ margin: 0 }}>{children}</p>;
            },

            code({ className, children }) {
              const isBlock = className?.includes("language-");

              return isBlock ? (
                <pre
                  style={{
                    background: "#0f172a",
                    color: "#e5e7eb",
                    padding: "12px",
                    borderRadius: "8px",
                    overflowX: "auto",
                    marginTop: "8px",
                  }}
                >
                  <code>{children}</code>
                </pre>
              ) : (
                <code
                  style={{
                    background: isUser ? "rgba(255,255,255,0.2)" : "#e5e7eb",
                    padding: "2px 6px",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  {children}
                </code>
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
