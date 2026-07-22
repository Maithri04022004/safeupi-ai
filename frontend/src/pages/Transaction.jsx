import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Transaction() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const [result, setResult] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Load all transactions
  const loadTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Add new transaction
  const handleTransaction = async () => {
    try {
      const response = await api.post("/transaction", {
        recipient,
        amount: Number(amount),
        purpose,
      });

      setResult(response.data);

      loadTransactions();

      alert("Transaction Added Successfully!");
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data);
      alert("Transaction Failed");
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
              "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "white",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "35px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            New UPI Transaction
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#e5e7eb",
              fontSize: "17px",
            }}
          >
            Send money securely while our AI analyzes every transaction
            for fraud, scams, and suspicious behaviour.
          </p>
        </div>

        {/* Transaction Form */}
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#111827",
              marginBottom: "30px",
            }}
          >
            Transaction Details
          </h2>

          <label
            style={{
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Recipient
          </label>

          <input
            type="text"
            placeholder="Enter recipient name"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "22px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <label
            style={{
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "22px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <label
            style={{
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Purpose
          </label>

          <input
            type="text"
            placeholder="Enter payment purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "30px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <button
            onClick={handleTransaction}
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
            Send Money & Analyze with AI
          </button>
        </div>

        {/* AI Result */}
        {result && (
                    <div
            style={{
              maxWidth: "850px",
              margin: "40px auto",
              background: "#ffffff",
              padding: "35px",
              borderRadius: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#111827",
                marginBottom: "25px",
              }}
            >
              AI Fraud Analysis Result
            </h2>

            <div
              style={{
                display: "inline-block",
                padding: "10px 24px",
                borderRadius: "30px",
                fontWeight: "700",
                color: "#fff",
                background:
                  result.risk_level === "High"
                    ? "#ef4444"
                    : result.risk_level === "Medium"
                    ? "#f59e0b"
                    : "#10b981",
                marginBottom: "20px",
              }}
            >
              Risk Level : {result.risk_level}
            </div>

            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              <div
                style={{
                  background: "#f8fafc",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <strong>Fraud Summary</strong>

                <p
                  style={{
                    marginTop: "8px",
                    color: "#4b5563",
                  }}
                >
                  {result.fraud_summary}
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <strong>AI Explanation</strong>

                <p
                  style={{
                    marginTop: "8px",
                    color: "#4b5563",
                  }}
                >
                  {result.ai_explanation}
                </p>
              </div>

              <div
                style={{
                  background: "#ecfeff",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <strong>Recommendations</strong>

                <ul style={{ marginTop: "12px" }}>
                  {result.recommendations?.map((item, index) => (
                    <li key={index} style={{ marginBottom: "8px" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "#fff7ed",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <strong>Warnings</strong>

                <ul style={{ marginTop: "12px" }}>
                  {result.warnings?.map((warning, index) => (
                    <li key={index} style={{ marginBottom: "8px" }}>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: result.scam_detected
                    ? "#fef2f2"
                    : "#ecfdf5",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <strong>Scam Detected</strong>

                <p
                  style={{
                    marginTop: "8px",
                    fontWeight: "600",
                    color: result.scam_detected
                      ? "#dc2626"
                      : "#16a34a",
                  }}
                >
                  {result.scam_detected ? "Yes" : "No"}
                </p>

                {result.scam_detected && (
                  <>
                    <hr
                      style={{
                        margin: "18px 0",
                        borderColor: "#e5e7eb",
                      }}
                    />

                    <p>
                      <strong>Scam Type</strong>
                    </p>

                    <p>{result.scam_type}</p>

                    <p
                      style={{
                        marginTop: "15px",
                      }}
                    >
                      <strong>Scam Education</strong>
                    </p>

                    <p>{result.scam_education}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recent Transactions */}

        <div
          style={{
            marginTop: "50px",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2563eb",
              marginBottom: "25px",
            }}
          >
            Recent Transactions
          </h2>

          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#4f46e5)",
                    color: "#ffffff",
                  }}
                >
                  <th style={{ padding: "15px" }}>ID</th>
                  <th style={{ padding: "15px" }}>Recipient</th>
                  <th style={{ padding: "15px" }}>Purpose</th>
                  <th style={{ padding: "15px" }}>Amount</th>
                  <th style={{ padding: "15px" }}>Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {transaction.id}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {transaction.recipient}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {transaction.purpose}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                        color: "#2563eb",
                      }}
                    >
                      ₹ {transaction.amount}
                    </td>

                    <td
                      style={{
                        padding: "14px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {new Date(
                        transaction.created_at
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;