import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await api.get("/analytics");
      setData(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load analytics");
    }
  };

  if (!data) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "100vh",
            background: "#f4f7fb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#1f2937" }}>Loading Analytics...</h2>
        </div>
      </>
    );
  }

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
            AI Analytics Dashboard
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#e5e7eb",
              fontSize: "17px",
            }}
          >
            Monitor transaction risks and AI-generated insights to
            better understand your UPI activity.
          </p>
        </div>

        {/* Risk Cards */}

        <h2
          style={{
            color: "#111827",
            marginBottom: "20px",
          }}
        >
          Risk Distribution
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#ef4444",
              color: "white",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <h3>🔴 High Risk</h3>

            <h1
              style={{
                fontSize: "42px",
                marginTop: "15px",
              }}
            >
              {data.high_risk_transactions}
            </h1>
          </div>

          <div
            style={{
              background: "#f59e0b",
              color: "white",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <h3>🟠 Medium Risk</h3>

            <h1
              style={{
                fontSize: "42px",
                marginTop: "15px",
              }}
            >
              {data.medium_risk_transactions}
            </h1>
          </div>

          <div
            style={{
              background: "#10b981",
              color: "white",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <h3>🟢 Low Risk</h3>

            <h1
              style={{
                fontSize: "42px",
                marginTop: "15px",
              }}
            >
              {data.low_risk_transactions}
            </h1>
          </div>
        </div>

        {/* AI Insights */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            🤖 AI Insights
          </h2>

          <div
            style={{
              background: "#f8fafc",
              borderLeft: "6px solid #2563eb",
              padding: "20px",
              borderRadius: "10px",
              color: "#374151",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            {data.insights}
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;