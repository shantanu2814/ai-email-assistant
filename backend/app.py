import os
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import models
import database
import ai
import gmail
import auth

load_dotenv()

# Initialize DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="MailAI Backend API")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- AUTH ROUTES ---
@app.get("/auth/login")
def login():
    flow = auth.create_google_oauth_flow()
    authorization_url, state = flow.authorization_url(prompt='consent', access_type='offline')
    return {"auth_url": authorization_url}

@app.get("/auth/callback")
def callback(code: str, db: Session = Depends(database.get_db)):
    flow = auth.create_google_oauth_flow()
    flow.fetch_token(code=code)
    credentials = flow.credentials
    
    # Simple store token example
    return {
        "status": "authenticated",
        "access_token": credentials.token,
        "refresh_token": credentials.refresh_token
    }

# --- AI ASSISTANT ROUTES ---
@app.post("/api/ai/summarize", response_model=models.AIResponse)
def summarize(req: models.EmailAnalysisRequest):
    result = ai.summarize_text(req.email_body, req.subject or "", req.sender or "")
    return models.AIResponse(action_type="summarize", result=result)

@app.post("/api/ai/draft-reply", response_model=models.AIResponse)
def draft_reply(req: models.EmailAnalysisRequest):
    result = ai.generate_reply(req.email_body, req.subject or "", req.sender or "")
    return models.AIResponse(action_type="draft_reply", result=result)

@app.post("/api/ai/action-items", response_model=models.AIResponse)
def action_items(req: models.EmailAnalysisRequest):
    result = ai.extract_actions(req.email_body)
    return models.AIResponse(action_type="action_items", result=result)

# --- GMAIL ROUTES ---
@app.get("/api/gmail/inbox")
def get_inbox(access_token: str = Query(...)):
    try:
        service = gmail.build_gmail_service(access_token)
        emails = gmail.fetch_inbox_messages(service)
        return {"emails": emails}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/gmail/send")
def send_email(req: models.SendEmailRequest, access_token: str = Query(...)):
    try:
        service = gmail.build_gmail_service(access_token)
        res = gmail.send_gmail_message(service, req.to, req.subject, req.body)
        return {"status": "sent", "id": res.get("id")}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
