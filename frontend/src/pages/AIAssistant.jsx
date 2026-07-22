import { useState } from "react";
import Navbar from "../components/Navbar";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = () => {
    if (question.trim() === "") return;

    // Temporary response
    setAnswer(
      "AI Assistant is analyzing your transaction history. Backend integration will be added next."
    );
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fb",
          padding: "35px",
        }}
      >
        {/* Header */}

        <div
          style={{
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",
            color: "white",
            padding: "35px",
            borderRadius: "18px",
            marginBottom: "35px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            🤖 SafeUPI AI Assistant
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#e5e7eb",
              fontSize: "17px",
            }}
          >
            Ask questions about your transactions, fraud analysis,
            spending behaviour, or AI security recommendations.
          </p>
        </div>

        {/* Main Card */}

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "18px",
            padding: "35px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#111827",
              marginBottom: "15px",
            }}
          >
            Ask Your Question
          </h2>

          <p
            style={{
              color: "#374151",
              marginBottom: "25px",
            }}
          >
            Example questions:
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "25px",
            }}
          >
            <span
              style={{
                background: "#e0ecff",
                color: "#2563eb",
                padding: "8px 14px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Why is Rahul risky?
            </span>

            <span
              style={{
                background: "#e0ecff",
                color: "#2563eb",
                padding: "8px 14px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Show my risky payments
            </span>

            <span
              style={{
                background: "#e0ecff",
                color: "#2563eb",
                padding: "8px 14px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              How can I avoid scams?
            </span>
          </div>

          <textarea
            rows="6"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "25px",
            }}
          />

          <button
            onClick={askAI}
            style={{
              width: "100%",
              padding: "15px",
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "600",
              boxShadow: "0 8px 18px rgba(37,99,235,0.3)",
            }}
          >
            Ask AI Assistant
          </button>

          {answer && (
            <div
              style={{
                marginTop: "35px",
                background: "#f8fafc",
                borderLeft: "6px solid #2563eb",
                borderRadius: "12px",
                padding: "25px",
              }}
            >
              <h3
                style={{
                  color: "#111827",
                  marginBottom: "15px",
                }}
              >
                🤖 AI Response
              </h3>

              <p
                style={{
                  color: "#374151",
                  lineHeight: "1.8",
                  fontSize: "16px",
                }}
              >
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AIAssistant;