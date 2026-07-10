from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from pydantic import BaseModel
from datetime import datetime


class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

# class TransactionRequest(BaseModel):
#     recipient: str
#     amount: float
#     purpose: str


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    sender_email = Column(String)
    recipient = Column(String)
    amount = Column(Float)
    purpose = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_at = Column(
    DateTime,
    default=datetime.utcnow
)