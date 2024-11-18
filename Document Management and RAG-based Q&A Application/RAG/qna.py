from langchain.llms import OpenAI
from langchain.vectorstores import PGVector
from langchain.chains import RetrievalQA
import os

# Initialize OpenAI LLM
llm = OpenAI(temperature=0, openai_api_key=os.getenv("OPENAI_API_KEY"))

def answer_question(question: str):
    # Load the PgVector store
    vector_store = PGVector(
        collection_name="documents",
        embedding_function=OpenAIEmbeddings(),
        connection_string=os.getenv("DATABASE_URL"),
    )

    # Retrieve top chunks and generate an answer
    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 5})
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

    return qa_chain.run(question)

