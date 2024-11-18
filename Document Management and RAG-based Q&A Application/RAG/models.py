from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.dialects.postgresql import VECTOR
from app.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    embedding = Column(VECTOR(1536))  # 1536-dimensional vector for OpenAI embeddings

