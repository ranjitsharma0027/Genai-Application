from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import PGVector
from sqlalchemy.orm import Session
from app.models import Document
from app.database import SessionLocal
from app.utils import split_text
import os

# Initialize OpenAI Embeddings
embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))

def ingest_document(title: str, content: str):
    db: Session = SessionLocal()

    # Split text into chunks
    chunks = split_text(content)

    # Generate embeddings for chunks and store in PgVector
    vector_store = PGVector.from_texts(
        texts=chunks,
        embedding=embeddings,
        collection_name="documents",
        connection_string=os.getenv("DATABASE_URL"),
    )

    # Save metadata in the database
    document = Document(title=title, content=content)
    db.add(document)
    db.commit()
    db.refresh(document)

    return document
