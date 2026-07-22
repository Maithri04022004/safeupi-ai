from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
from datetime import datetime


class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    sender_email = Column(String)
    recipient = Column(String)
    amount = Column(Float)
    purpose = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)