import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.access_token);

      alert("Login Successful!");

      console.log(response.data);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login Failed");
      } else {
        alert("Server not responding");
      }

      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#2563eb,#4f46e5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "#2563eb",
              marginBottom: "10px",
              fontSize: "34px",
            }}
          >
            SafeUPI AI
          </h1>

          <p
            style={{
              color: "#374151",
              margin: 0,
            }}
          >
            AI Powered UPI Fraud Detection System
          </p>
        </div>

        <h2
          style={{
            marginBottom: "25px",
            color: "#111827",
          }}
        >
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "18px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "25px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            background:
              "linear-gradient(135deg,#2563eb,#4f46e5)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",
            boxShadow:
              "0 8px 20px rgba(37,99,235,0.35)",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#374151",
            fontSize: "14px",
          }}
        >
          Secure AI-powered protection for every UPI transaction.
        </p>
      </div>
    </div>
  );
}

export default Login;