from pydantic import BaseModel

class DocumentSchema(BaseModel):
    title: str
    content: str

class QnaRequestSchema(BaseModel):
    question: str

