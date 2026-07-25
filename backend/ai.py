import os
from openai import OpenAI
from fastapi import HTTPException

def get_grok_client():
    # 1. Read the Grok key
    api_key = os.getenv("GROK_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="GROK_API_KEY is missing from environment variables."
        )
    
    # 2. Direct the standard OpenAI client to xAI's servers
    return OpenAI(
        api_key=api_key,
        base_url="https://api.x.ai/v1"
    )

def summarize_text(email_body: str, subject: str = "", sender: str = "") -> str:
    client = get_grok_client()
    prompt = f"Subject: {subject}\nSender: {sender}\n\nEmail Body:\n{email_body}"
    
    response = client.chat.completions.create(
        model="grok-2-latest",  # <-- 3. Change model to a Grok model
        messages=[
            {"role": "system", "content": "Provide a concise bulleted summary highlighting core points."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    return response.choices[0].message.content.strip()
