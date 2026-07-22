import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_BASE = "http://127.0.0.1:8000";

export default function QRScanner() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleScan = async () => {
    if (!image) {
      alert("Please select a QR image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE}/scan-qr`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Unable to scan QR."
      );
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "#10b981";
      case "Medium":
        return "#f59e0b";
      case "High":
        return "#ef4444";
      default:
        return "#374151";
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
            📱 AI QR Scam Detector
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#e5e7eb",
              fontSize: "17px",
            }}
          >
            Upload any UPI QR Code and let AI analyze whether it is
            safe or potentially fraudulent.
          </p>
        </div>

        {/* Upload Card */}

        <div
          style={{
            maxWidth: "850px",
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
            Upload QR Code
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
            }}
          />

          {preview && (
            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              <img
                src={preview}
                alt="QR Preview"
                style={{
                  width: "260px",
                  borderRadius: "15px",
                  border: "2px solid #e5e7eb",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
              />
            </div>
          )}

          <button
            onClick={handleScan}
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
              ? "Scanning QR..."
              : "Scan QR with AI"}
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
                Scan Result
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "18px",
                }}
              >
                <div>
                  <strong>Decoded Content</strong>

                  <p
                    style={{
                      color: "#4b5563",
                    }}
                  >
                    {result.decoded_text}
                  </p>
                </div>

                <div>
                  <strong>UPI ID</strong>

                  <p
                    style={{
                      color: "#4b5563",
                    }}
                  >
                    {result.upi_id || "Not Found"}
                  </p>
                </div>

                <div>
                  <strong>Risk Level</strong>

                  <br />

                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      background: getRiskColor(
                        result.risk_level
                      ),
                      color: "#fff",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      fontWeight: "700",
                    }}
                  >
                    {result.risk_level}
                  </span>
                </div>

                <div>
                  <strong>Reason</strong>

                  <p
                    style={{
                      color: "#4b5563",
                    }}
                  >
                    {result.reason}
                  </p>
                </div>

                <div>
                  <strong>Recommendation</strong>

                  <p
                    style={{
                      color: "#4b5563",
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