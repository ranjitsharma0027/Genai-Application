from langchain.text_splitter import RecursiveCharacterTextSplitter

def split_text(content: str, chunk_size: int = 500, chunk_overlap: int = 50):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )
    return text_splitter.split_text(content)

