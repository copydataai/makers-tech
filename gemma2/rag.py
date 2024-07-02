from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain.chains import create_retrieval_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter

from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_chroma import Chroma

from langchain_core.prompts import ChatPromptTemplate

from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.chat_models import ChatOllama

OLLAMA_MODEL = "gemma2:9b"


def load_csv():
    file_path = "./Dataset200.csv"

    ollama = ChatOllama(model=OLLAMA_MODEL)

    loader = CSVLoader(file_path=file_path)
    data = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )

    docs = text_splitter.split_documents(data)
    print("split", len(docs))

    vectors = Chroma.from_documents(
        documents=docs,
        embedding=OllamaEmbeddings(model=OLLAMA_MODEL),
    )

    retriever = vectors.as_retriever()

    # 2. Incorporate the retriever into a question-answering chain.
    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the "
        "answer concise."
        "\n\n"
        "{context}"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}"),
        ]
    )

    question_answer_chain = create_stuff_documents_chain(ollama, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    response = rag_chain.invoke({"input": "What is the price of the laptop?"})
    print(response)


if __name__ == "__main__":
    load_csv()
