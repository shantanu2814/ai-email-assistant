from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Text
from database import Base

# --- SQLAlchemy Database Model ---
class UserToken(Base):
    __tablename__ = "user_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, unique=True, index=True)
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text, nullable=True)
    token_uri = Column(String)
    client_id = Column(String)
    client_secret = Column(String)

# --- Pydantic Schemas ---
class EmailAnalysisRequest(BaseModel):
    email_body: str
    subject: Optional[str] = None
    sender: Optional[str] = None

class CustomPromptRequest(BaseModel):
    prompt: str
    email_body: str
    subject: Optional[str] = None

class AIResponse(BaseModel):
    action_type: str
    result: str

class SendEmailRequest(BaseModel):
    to: str
    subject: str
    body: str
