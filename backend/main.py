from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from database import engine, SessionLocal
# from models import Base, TransactionRequest, UserDB
from auth import create_access_token
from models import Base, UserDB, Transaction
from ai.risk_detector import (check_risk, calculate_risk_level,calculate_risk_score,generate_fraud_summary,get_recommendations)
from ai.behavior_ai import detect_suspicious_amounts
from ai.time_risk import check_unusual_time
from datetime import datetime




Base.metadata.create_all(bind=engine)

app = FastAPI()


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
    risk_level = calculate_risk_level(warnings)
    risk_score = calculate_risk_score(warnings)

    fraud_summary = generate_fraud_summary(
    risk_level,
    warnings
)
    
    recommendations = get_recommendations(warnings)

    return {
    "message": "Transaction added",
    "transaction_id": new_transaction.id,
    "risk_level": risk_level,
    "risk_score": risk_score,
    "fraud_summary": fraud_summary,
    "recommendations": recommendations,
    "warnings": warnings
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