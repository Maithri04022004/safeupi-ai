import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = (path) => ({
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: "500",
    background:
      location.pathname === path
        ? "rgba(255,255,255,0.22)"
        : "transparent",
    transition: "0.3s",
  });

  return (
    <nav
      style={{
        background: "linear-gradient(135deg,#2563eb,#4f46e5)",
        padding: "16px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}

      <h2
        style={{
          color: "#ffffff",
          margin: 0,
          fontWeight: "700",
        }}
      >
        SafeUPI AI
      </h2>

      {/* Navigation */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "8px",
        }}
      >
        <Link to="/dashboard" style={linkStyle("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/transaction" style={linkStyle("/transaction")}>
          Transaction
        </Link>

        <Link to="/analytics" style={linkStyle("/analytics")}>
          Analytics
        </Link>

        <Link to="/assistant" style={linkStyle("/assistant")}>
          AI Assistant
        </Link>

        <Link to="/qr-scanner" style={linkStyle("/qr-scanner")}>
          QR Scanner
        </Link>

        <Link
          to="/voice-scanner"
          style={linkStyle("/voice-scanner")}
        >
          Voice Scanner
        </Link>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "#ffffff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            marginLeft: "10px",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;