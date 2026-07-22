from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from database import engine, SessionLocal
# from models import Base, TransactionRequest, UserDB
from auth import create_access_token
from models import Base, UserDB, Transaction
from ai.risk_detector import (check_risk, calculate_risk_level,calculate_risk_score,generate_fraud_summary,get_recommendations)
from ai.behavior_ai import detect_suspicious_amounts
from ai.time_risk import check_unusual_time
from datetime import datetime,date,timedelta
from ai.transaction_explainer import explain_risk
from ai.purpose_detector import detect_scam_purpose
from ai.scam_education import get_scam_education
from ai.analytics_ai import generate_insights
from fastapi.middleware.cors import CORSMiddleware
from qr_api import router as qr_router
from voice_api import router as voice_router




Base.metadata.create_all(bind=engine)

app = FastAPI()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(qr_router)
app.include_router(voice_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "SafeUPI AI Backend Running"}


# Register model
class User(BaseModel):
    name: str
    email: str
    password: str

class TransactionRequest(BaseModel):
    recipient: str
    amount: float
    purpose: str


# Login model
class Login(BaseModel):
    email: str
    password: str



@app.post("/register")
def register(user: User):
    db = SessionLocal()

    existing_user = db.query(UserDB).filter(
        UserDB.email == user.email
    ).first()

    if existing_user:
        return {
            "message": "Email already registered"
        }

    new_user = UserDB(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@app.post("/login")
def login(data: Login):
    db = SessionLocal()

    user = db.query(UserDB).filter(
        UserDB.email == data.email
    ).first()

    if not user:
        return {"message": "Invalid credentials"}

    if user.password != data.password:
        return {"message": "Invalid credentials"}

    token = create_access_token(
        {"sub": user.email}
    )

    return {
    "message": "Login Successful",
    "access_token": token,
    "token_type": "bearer"
}


@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}

@app.get("/profile")
def profile():
    return {
        "message": "Protected route"
    }

@app.post("/transaction")
def add_transaction(data: TransactionRequest):
    db = SessionLocal()

    new_transaction = Transaction(
        recipient=data.recipient,
        amount=data.amount,
        purpose=data.purpose
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    history = db.query(Transaction).all()

    warnings = check_risk(new_transaction, history)
    warnings = check_risk(new_transaction, history)

    

    risk_level = calculate_risk_level(warnings)
    risk_score = calculate_risk_score(warnings)
    scam_detected, scam_keywords = detect_scam_purpose(data.purpose)
    scam_type = None
    scam_education = None

    if scam_detected:
        scam_type, scam_education = get_scam_education(scam_keywords)

    if scam_detected:
        warnings.append(
        f"Suspicious transaction purpose detected. Keywords found: {', '.join(scam_keywords)}"
    )

    fraud_summary = generate_fraud_summary(
    risk_level,
    warnings
)
    
    recommendations = get_recommendations(warnings)
    ai_explanation = explain_risk(risk_level, warnings)

    return {
    "message": "Transaction added",
    "transaction_id": new_transaction.id,
    "risk_level": risk_level,
    "warnings": warnings,
    "fraud_summary": fraud_summary,
    "recommendations": recommendations,
    "ai_explanation": ai_explanation,
    "scam_detected": scam_detected,
    "scam_keywords": scam_keywords,
    "scam_type": scam_type,
    "scam_education": scam_education
}

@app.get("/analyze")
def analyze_transactions():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    amounts = []

    for transaction in transactions:
        amounts.append(transaction.amount)

    suspicious = detect_suspicious_amounts(amounts)

    return {
        "total_transactions": len(amounts),
        "suspicious_amounts": suspicious
    }

@app.get("/transactions")
def get_transactions():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    return transactions

@app.get("/today-transactions")
def today_transactions():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    today = datetime.utcnow().date()

    count = 0

    for t in transactions:
        if t.created_at.date() == today:
            count += 1

    return {
        "date": str(today),
        "total_transactions": count
    }

@app.get("/today-transactions-list")
def today_transactions_list():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    today = datetime.utcnow().date()

    result = []

    for t in transactions:
        if t.created_at.date() == today:
            result.append(t)

    return result

@app.get("/transactions")
def get_transactions():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    result = []

    for t in transactions:
        result.append({
            "id": t.id,
            "recipient": t.recipient,
            "amount": t.amount,
            "purpose": t.purpose
        })

    return {
        "total_transactions": len(result),
        "transactions": result
    }

@app.get("/analytics")
def get_analytics():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    high_risk = 0
    medium_risk = 0
    low_risk = 0

    total_transactions = len(transactions)

    total_amount = sum(t.amount for t in transactions)

    average_amount = (
        total_amount / total_transactions
        if total_transactions > 0 else 0
    )

    recipient_count = {}

    for t in transactions:

        # Count recipients
        recipient_count[t.recipient] = recipient_count.get(t.recipient, 0) + 1

        # Calculate risk
        warnings = check_risk(t, transactions)
        risk = calculate_risk_level(warnings)

        if risk == "High":
            high_risk += 1
        elif risk == "Medium":
            medium_risk += 1
        else:
            low_risk += 1

    most_frequent_recipient = None

    if recipient_count:
        most_frequent_recipient = max(
            recipient_count,
            key=recipient_count.get
        )

    insights = generate_insights(
        total_transactions,
        total_amount,
        round(average_amount, 2),
        most_frequent_recipient,
        high_risk,
        medium_risk,
        low_risk
    )

    return {
        "total_transactions": total_transactions,
        "total_amount": total_amount,
        "average_transaction": round(average_amount, 2),
        "most_frequent_recipient": most_frequent_recipient,
        "high_risk_transactions": high_risk,
        "medium_risk_transactions": medium_risk,
        "low_risk_transactions": low_risk,
        "insights": insights
    }

@app.get("/daily-stats")
def daily_stats():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    today = date.today()

    today_transactions = [
        t for t in transactions
        if t.created_at.date() == today
    ]

    total_transactions = len(today_transactions)

    total_amount = sum(t.amount for t in today_transactions)

    high_risk = 0

    for t in today_transactions:
        warnings = check_risk(t, transactions)
        risk = calculate_risk_level(warnings)

        if risk == "High":
            high_risk += 1

    return {
        "date": str(today),
        "total_transactions": total_transactions,
        "total_amount": total_amount,
        "high_risk_transactions": high_risk
    }

@app.get("/weekly-stats")
def weekly_stats():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    today = date.today()
    week_start = today - timedelta(days=7)

    weekly_transactions = [
        t for t in transactions
        if t.created_at.date() >= week_start
    ]

    total_transactions = len(weekly_transactions)

    total_amount = sum(t.amount for t in weekly_transactions)

    high_risk = 0
    medium_risk = 0
    low_risk = 0

    for t in weekly_transactions:
        warnings = check_risk(t, transactions)
        risk = calculate_risk_level(warnings)

        if risk == "High":
            high_risk += 1
        elif risk == "Medium":
            medium_risk += 1
        else:
            low_risk += 1

    return {
        "week_start": str(week_start),
        "week_end": str(today),
        "total_transactions": total_transactions,
        "total_amount": total_amount,
        "high_risk_transactions": high_risk,
        "medium_risk_transactions": medium_risk,
        "low_risk_transactions": low_risk
    }

@app.get("/monthly-stats")
def monthly_stats():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    today = date.today()

    monthly_transactions = [
        t for t in transactions
        if t.created_at.month == today.month
        and t.created_at.year == today.year
    ]

    total_transactions = len(monthly_transactions)

    total_amount = sum(t.amount for t in monthly_transactions)

    high_risk = 0
    medium_risk = 0
    low_risk = 0

    for t in monthly_transactions:
        warnings = check_risk(t, transactions)
        risk = calculate_risk_level(warnings)

        if risk == "High":
            high_risk += 1
        elif risk == "Medium":
            medium_risk += 1
        else:
            low_risk += 1

    return {
        "month": today.strftime("%B %Y"),
        "total_transactions": total_transactions,
        "total_amount": total_amount,
        "high_risk_transactions": high_risk,
        "medium_risk_transactions": medium_risk,
        "low_risk_transactions": low_risk
    }


@app.get("/top-recipients")
def top_recipients():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    recipient_data = {}

    for t in transactions:
        if t.recipient not in recipient_data:
            recipient_data[t.recipient] = {
                "transactions": 0,
                "amount": 0
            }

        recipient_data[t.recipient]["transactions"] += 1
        recipient_data[t.recipient]["amount"] += t.amount

    sorted_recipients = sorted(
        recipient_data.items(),
        key=lambda x: x[1]["transactions"],
        reverse=True
    )

    result = []

    for recipient, data in sorted_recipients[:5]:
        result.append({
            "recipient": recipient,
            "transactions": data["transactions"],
            "total_amount": data["amount"]
        })

    return {
        "top_recipients": result
    }

@app.get("/category-spending")
def category_spending():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    category_data = {}

    for t in transactions:
        category = t.purpose

        if category not in category_data:
            category_data[category] = 0

        category_data[category] += t.amount

    result = []

    for category, amount in category_data.items():
        result.append({
            "category": category,
            "total_amount": amount
        })

    result = sorted(
        result,
        key=lambda x: x["total_amount"],
        reverse=True
    )

    return {
        "category_spending": result
    }

@app.get("/risk-trends")
def risk_trends():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    high = 0
    medium = 0
    low = 0

    for t in transactions:
        warnings = check_risk(t, transactions)
        risk = calculate_risk_level(warnings)

        if risk == "High":
            high += 1
        elif risk == "Medium":
            medium += 1
        else:
            low += 1

    return {
        "risk_distribution": [
            {
                "risk_level": "High",
                "count": high
            },
            {
                "risk_level": "Medium",
                "count": medium
            },
            {
                "risk_level": "Low",
                "count": low
            }
        ]
    }

@app.get("/dashboard")
def dashboard():
    db = SessionLocal()

    transactions = db.query(Transaction).all()

    total_transactions = len(transactions)
    total_amount = sum(t.amount for t in transactions)

    average_transaction = (
        total_amount / total_transactions
        if total_transactions > 0 else 0
    )

    recipient_count = {}
    category_data = {}

    high = 0
    medium = 0
    low = 0

    for t in transactions:

        recipient_count[t.recipient] = recipient_count.get(t.recipient, 0) + 1

        category_data[t.purpose] = category_data.get(t.purpose, 0) + t.amount

        warnings = check_risk(t, transactions)
        risk = calculate_risk_level(warnings)

        if risk == "High":
            high += 1
        elif risk == "Medium":
            medium += 1
        else:
            low += 1

    most_frequent_recipient = None

    if recipient_count:
        most_frequent_recipient = max(
            recipient_count,
            key=recipient_count.get
        )

    return {
        "summary": {
            "total_transactions": total_transactions,
            "total_amount": total_amount,
            "average_transaction": round(average_transaction, 2),
            "most_frequent_recipient": most_frequent_recipient
        },
        "risk_distribution": {
            "high": high,
            "medium": medium,
            "low": low
        },
        "top_recipients": recipient_count,
        "category_spending": category_data
    }