import os
from fastapi import APIRouter, HTTPException
from openai import OpenAI
from schemas.ai_schemas import EmailAnalysisRequest, CustomPromptRequest, AIResponse

router = APIRouter(prefix="/api/ai", tags=["AI Assistant"])

# Initialize OpenAI Client lazily using env variable
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or api_key == "your_openai_api_key_here":
        raise HTTPException(
            status_code=500, 
            detail="OPENAI_API_KEY is missing or invalid in backend/.env"
        )
    return OpenAI(api_key=api_key)


@router.post("/summarize", response_model=AIResponse)
def summarize_email(data: EmailAnalysisRequest):
    client = get_openai_client()
    
    prompt = f"Subject: {data.subject or 'N/A'}\nSender: {data.sender or 'N/A'}\n\nEmail Body:\n{data.email_body}"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an executive email assistant. Provide a concise bulleted summary highlighting core points and urgency."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        return AIResponse(
            action_type="summarize",
            result=response.choices[0].message.content.strip()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/draft-reply", response_model=AIResponse)
def draft_reply(data: EmailAnalysisRequest):
    client = get_openai_client()
    
    prompt = f"Subject: {data.subject or 'N/A'}\nSender: {data.sender or 'N/A'}\n\nEmail Body:\n{data.email_body}"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Draft a polite, professional, and clear email response. Keep formatting ready to paste into an email composer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        return AIResponse(
            action_type="draft_reply",
            result=response.choices[0].message.content.strip()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/action-items", response_model=AIResponse)
def extract_action_items(data: EmailAnalysisRequest):
    client = get_openai_client()
    
    prompt = f"Email Content:\n{data.email_body}"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Extract explicit tasks, deadlines, and follow-ups into a numbered checklist. If none exist, state 'No actionable tasks identified.'"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        return AIResponse(
            action_type="action_items",
            result=response.choices[0].message.content.strip()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ask", response_model=AIResponse)
def ask_custom_question(data: CustomPromptRequest):
    client = get_openai_client()
    
    context = f"Email Context:\nSubject: {data.subject or 'N/A'}\nBody: {data.email_body}\n\nUser Question: {data.prompt}"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Answer the user's question accurately using only information from the provided email context."},
                {"role": "user", "content": context}
            ],
            temperature=0.5
        )
        return AIResponse(
            action_type="ask",
            result=response.choices[0].message.content.strip()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
