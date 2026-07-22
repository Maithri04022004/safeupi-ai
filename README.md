# 🛡️ SafeUPI-AI

> **An AI-Powered UPI Fraud Detection & Scam Prevention System**

SafeUPI-AI is a full-stack FinTech application that enhances the security of UPI transactions using Artificial Intelligence.
The system analyzes transactions, detects suspicious payment behavior, scans QR codes for fraud, analyzes scam voice recordings, 
and provides intelligent recommendations to help users avoid financial scams.

---

# 🚀 Features

### 🔐 Authentication
- JWT Based Secure Login
- Protected Dashboard
- User Session Management

### 💳 AI Transaction Analysis
- Add New Transaction
- AI Fraud Detection
- Risk Level Classification (Low / Medium / High)
- AI Fraud Summary
- AI Explanation
- Scam Detection
- Scam Education
- Personalized Recommendations
- Warning Messages

### 📊 Dashboard
- Total Transactions
- Total Amount
- Average Transaction Value
- Most Frequent Recipient
- Risk Distribution
- Category Spending Analysis
- Interactive Charts

### 📈 Analytics
- High Risk Transactions
- Medium Risk Transactions
- Low Risk Transactions
- AI Generated Insights

### 🤖 AI Assistant
- Transaction-related AI Assistant Interface
- Intelligent Query Response UI

### 📷 QR Scam Detection
- Upload QR Image
- Decode QR Code
- Extract UPI ID
- AI Risk Analysis
- Fraud Reason Detection
- Safety Recommendation

### 🎤 Voice Scam Detection
- Upload Audio Recording
- Speech-to-Text Processing
- Scam Detection
- Risk Level Analysis
- Scam Type Detection
- AI Recommendation

---

# 🧠 AI Modules

The project consists of multiple AI modules working together:

- analytics_ai.py
- behavior_ai.py
- purpose_detection.py
- qr_detector.py
- resume_ai.py
- risk_detector.py
- scam_education.py
- time_risk.py
- voice_detector.py

---

# 🛠️ Tech Stack

## Frontend

- React (Vite)
- React Router
- Axios
- CSS
- JavaScript

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication

## AI Technologies

- OpenCV
- Speech Recognition
- Rule-Based AI Engine
- Gemini API
---

# 🏗️ Project Architecture

```

           User
             │
             ▼
      React Frontend
             │
        Axios API Calls
             │
             ▼
      FastAPI Backend
             │
 ┌───────────────────────────┐
 │ Transaction AI            │
 │ Fraud Detection           │
 │ QR Detection              │
 │ Voice Detection           │
 │ Analytics Engine          │
 │ Scam Education            │
 └───────────────────────────┘
             │
             ▼
      PostgreSQL Database

```

---

# 📂 Project Structure

```

safeupi-ai/

├── backend/
│ ├── ai/
│ ├── database.py
│ ├── models.py
│ ├── qr_api.py
│ ├── voice_api.py
│ ├── main.py
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│
├── demo_audio/
│
├── screenshots/
│ ├── login.png
│ ├── dashboard.png
│ ├── transaction.png
│ ├── analytics.png
│ ├── assistant.png
│ ├── qr-scanner.png
│ └── voice-scanner.png
│
└── README.md

```
# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Maithri04022004/safeupi-ai.git
cd safeupi-ai
```

---

## 2️⃣ Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI Server
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

Swagger API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|----------|----------------|-------------------------------|
| POST | /login | User Login |
| GET | /dashboard | Dashboard Summary |
| POST | /transaction | Add New Transaction |
| GET | /transactions | Get All Transactions |
| GET | /analytics | AI Analytics |
| POST | /scan-qr | AI QR Scam Detection |
| POST | /scan-voice | AI Voice Scam Detection |

---

# 🖥️ Frontend Pages

- 🔐 Login
- 📊 Dashboard
- 💳 Transactions
- 📈 Analytics
- 🤖 AI Assistant
- 📷 QR Scanner
- 🎤 Voice Scanner

---



# 💡 Future Enhancements

- Machine Learning based Fraud Prediction
- Live Transaction Monitoring
- Merchant Verification
- Push Notifications
- Mobile Application
- Cloud Deployment
- Real-time Fraud Alerts

---

# 🎯 Learning Outcomes

Through this project, I gained practical experience in:

- Full Stack Application Development
- React.js Development
- FastAPI Backend Development
- PostgreSQL Database Design
- JWT Authentication
- REST API Development
- AI-based Fraud Detection
- QR Code Processing
- Voice Scam Analysis
- Dashboard Design
- Secure FinTech Application Development

---

# 👨‍💻 Author

**Maithri V**

Bachelor of Engineering (Information Science & Engineering)

📧 Email: *maithrivkanaka@gmail.com*

🔗 GitHub: https://github.com/Maithri04022004

🔗 LinkedIn: https://www.linkedin.com/in/maithrivkanaka

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

---

## Thank You ❤️
