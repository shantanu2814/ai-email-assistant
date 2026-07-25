from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Import the AI router
from routers.ai import router as ai_router

load_dotenv()

app = FastAPI(
    title="MailAI Backend API",
    description="FastAPI service for Gmail API integration and OpenAI email analysis.",
    version="1.0.0"
)

# CORS setup
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(ai_router)

@app.get("/")
def root():
    return {"status": "online", "message": "MailAI FastAPI Server Running"}
