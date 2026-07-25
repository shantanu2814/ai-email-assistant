import os
from openai import OpenAI
from fastapi import HTTPException

def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is missing from backend environment variables.")
    return OpenAI(api_key=api_key)

def summarize_text(email_body: str, subject: str = "", sender: str = "") -> str:
    client = get_openai_client()
    prompt = f"Subject: {subject}\nSender: {sender}\n\nEmail Body:\n{email_body}"
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Provide a concise bulleted summary highlighting core points and key urgency."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    return response.choices[0].message.content.strip()

def generate_reply(email_body: str, subject: str = "", sender: str = "") -> str:
    client = get_openai_client()
    prompt = f"Subject: {subject}\nSender: {sender}\n\nEmail Body:\n{email_body}"
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Draft a polite, professional email reply addressing the email text."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    return response.choices[0].message.content.strip()

def extract_actions(email_body: str) -> str:
    client = get_openai_client()
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Extract explicit action items into a checklist. If none exist, output 'No action items required.'"},
            {"role": "user", "content": email_body}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content.strip()
