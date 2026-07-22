import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Analytics from "./pages/Analytics";
import AIAssistant from "./pages/AIAssistant";
import QRScanner from "./pages/QRScanner";
import VoiceScanner from "./pages/VoiceScanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/assistant" element={<AIAssistant />} />

        <Route path="/qr-scanner" element={<QRScanner />} />
        <Route path="/voice-scanner" element={<VoiceScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;