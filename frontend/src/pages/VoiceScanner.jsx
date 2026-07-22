import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_BASE = "http://127.0.0.1:8000";

export default function VoiceScanner() {
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAudio = (e) => {
    if (e.target.files.length > 0) {
      setAudio(e.target.files[0]);
      setResult(null);
    }
  };

  const scanVoice = async () => {
    if (!audio) {
      alert("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audio);

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/scan-voice`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Voice scan failed.");
    } finally {
      setLoading(false);
    }
  };

  const riskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "#10b981";
      case "Medium":
        return "#f59e0b";
      case "High":
        return "#ef4444";
      default:
        return "#6b7280";
    }
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
            background:
              "linear-gradient(135deg,#2563eb,#4f46e5)",
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
            🎤 AI Voice Scam Detector
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#e5e7eb",
              fontSize: "17px",
            }}
          >
            Upload a recorded phone call or voice clip. AI will
            analyze the conversation for fraud, scam patterns,
            and suspicious behaviour.
          </p>
        </div>

        {/* Upload Card */}

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#111827",
              marginBottom: "25px",
            }}
          >
            Upload Audio File
          </h2>

          <input
            type="file"
            accept="audio/*"
            onChange={handleAudio}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
            }}
          />

          <button
            onClick={scanVoice}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "15px",
              background:
                "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "600",
              boxShadow:
                "0 8px 18px rgba(37,99,235,0.30)",
            }}
          >
            {loading
              ? "Analyzing Voice..."
              : "Analyze Voice with AI"}
          </button>

          {result && (
            <div
              style={{
                marginTop: "40px",
                background: "#f8fafc",
                padding: "30px",
                borderRadius: "15px",
                borderLeft: "6px solid #2563eb",
              }}
            >
              <h2
                style={{
                  color: "#111827",
                  marginBottom: "20px",
                }}
              >
                AI Voice Analysis
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "18px",
                }}
              >
                <div>
                  <strong>Transcript</strong>

                  <p
                    style={{
                      color: "#4b5563",
                      lineHeight: "1.7",
                    }}
                  >
                    {result.transcript}
                  </p>
                </div>

                <div>
                  <strong>Risk Level</strong>

                  <br />

                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      background: riskColor(
                        result.risk_level
                      ),
                      color: "#ffffff",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      fontWeight: "700",
                    }}
                  >
                    {result.risk_level}
                  </span>
                </div>

                <div>
                  <strong>Confidence</strong>

                  <p
                    style={{
                      color: "#4b5563",
                    }}
                  >
                    {result.confidence}%
                  </p>
                </div>

                <div>
                  <strong>Detected Scam Types</strong>

                  <p
                    style={{
                      color: "#4b5563",
                    }}
                  >
                    {result.scam_types?.join(", ") || "None"}
                  </p>
                </div>

                <div>
                  <strong>AI Recommendation</strong>

                  <p
                    style={{
                      color: "#4b5563",
                      lineHeight: "1.7",
                    }}
                  >
                    {result.recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}