from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from app.ingestion import ingest_document
from app.qna import answer_question
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Request schemas
class IngestRequest(BaseModel):
    title: str
    content: str

class QnaRequest(BaseModel):
    question: str

# Middleware for API Key Authentication
def verify_api_key(authorization: str = Header(None)):
    if authorization != f"Bearer {os.getenv('PYTHON_BACKEND_API_KEY')}":
        raise HTTPException(status_code=401, detail="Unauthorized request")

@app.post("/ingest")
def ingest(req: IngestRequest, authorization: str = Header(None)):
    verify_api_key(authorization)
    try:
        document = ingest_document(req.title, req.content)
        return {"id": document.id, "message": "Document ingested successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/qna")
def qna(req: QnaRequest, authorization: str = Header(None)):
    verify_api_key(authorization)
    try:
        answer = answer_question(req.question)
        return {"question": req.question, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

