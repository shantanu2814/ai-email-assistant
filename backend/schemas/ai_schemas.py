from pydantic import BaseModel
from typing import Optional

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
