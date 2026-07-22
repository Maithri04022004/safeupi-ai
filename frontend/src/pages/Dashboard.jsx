import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../services/dashboardService";
import Navbar from "../components/Navbar";
import RiskChart from "../components/RiskChart";
import CategoryChart from "../components/CategoryChart";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardData();
      setDashboard(data);
    } catch (error) {
      console.log("Dashboard Error:", error);
      console.log("Response:", error.response);
      console.log("Response Data:", error.response?.data);
      console.log("Message:", error.message);
      alert("Failed to load dashboard");
    }
  };

  if (!dashboard) {
    return (
      <>
        <Navbar />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f4f7fb",
          }}
        >
          <h2 style={{ color: "#1f2937" }}>Loading Dashboard...</h2>
        </div>
      </>
    );
  }

  const summaryCards = [
  {
    title: "Total Transactions",
    value: dashboard.summary.total_transactions,
    icon: "💳",
  },
  {
    title: "Total Amount",
    value: `₹ ${Number(
      dashboard.summary.total_amount
    ).toLocaleString("en-IN")}`,
    icon: "💰",
  },
  {
    title: "Average Transaction",
    value: `₹ ${Number(
      dashboard.summary.average_transaction
    ).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    icon: "📊",
  },
  {
    title: "Top Recipient",
    value: dashboard.summary.most_frequent_recipient,
    icon: "👤",
  },
];
const riskCards = [
  {
    title: "High Risk",
    value: dashboard.risk_distribution.high,
    color: "#ef4444",
  },
  {
    title: "Medium Risk",
    value: dashboard.risk_distribution.medium,
    color: "#f59e0b",
  },
  {
    title: "Low Risk",
    value: dashboard.risk_distribution.low,
    color: "#10b981",
  },
];
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
              "linear-gradient(135deg, #2563eb, #4f46e5)",
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
            SafeUPI AI Dashboard
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "17px",
              color: "#f3f4f6",
            }}
          >
            Monitor your UPI transactions with AI-powered fraud detection,
            analytics, QR security, and voice scam detection.
          </p>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "22px",
          }}
        >
          {summaryCards.map((card, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "28px",
  minHeight: "180px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  marginBottom: "12px",
                }}
              >
                {card.icon}
              </div>

              <h3
                style={{
                  color: "#374151",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                {card.title}
              </h3>

              <h1
                style={{
                  color: "#111827",
    marginTop: "8px",
    marginBottom: 0,
    fontWeight: "700",
    fontSize: "30px",
    lineHeight: "1.2",
    wordBreak: "break-word",
    overflowWrap: "break-word",
                }}
              >
                {card.value}
              </h1>
            </div>
          ))}
        </div>

        {/* Risk Cards */}
        <h2
          style={{
            marginTop: "50px",
            marginBottom: "25px",
            color: "#111827",
          }}
        >
          Risk Distribution
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          {riskCards.map((risk, index) => (
            <div
              key={index}
              style={{
                background: risk.color,
                color: "white",
                padding: "25px",
                borderRadius: "18px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              }}
            >
              <h3>{risk.title}</h3>

              <h1
                style={{
                  fontSize: "48px",
                  marginTop: "15px",
                }}
              >
                {risk.value}
              </h1>
            </div>
          ))}
        </div>

        {/* Risk Chart */}
        <div
          style={{
            background: "#ffffff",
            marginTop: "45px",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Risk Distribution Chart
          </h2>

          <RiskChart risk={dashboard.risk_distribution} />
        </div>

        {/* Category Chart */}
        <div
          style={{
            background: "#ffffff",
            marginTop: "40px",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Category Spending
          </h2>

          <CategoryChart
            categories={dashboard.category_spending}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;