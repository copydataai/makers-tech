import { Ollama } from "@langchain/community/llms/ollama";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

import { ChatOllama } from "@langchain/community/chat_models/ollama";

import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const MODEL_OLLAMA = "gemma2:9b";
const MODEL_OLLAMA_ENDPOINT = "http://localhost:11434";
export async function TrainingOllama() {
    const ollama = new ChatOllama({ model: MODEL_OLLAMA });
    const loader = new CSVLoader("gemma2/Dataset200.csv");
    const databaseCSV = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const documents = await textSplitter.splitDocuments(databaseCSV);

    const embeddings = new OllamaEmbeddings({ model: MODEL_OLLAMA });

    const vectorStore = await MemoryVectorStore.fromDocuments(
        databaseCSV,
        embeddings,
    );

    const retriever = await vectorStore.asRetriever();

    const prompt = PromptTemplate.fromTemplate(
        `
    You are a Postgres expert. Given an input question, first create a syntactically correct Postgres query to run, then look at the results of the query and return the answer to the input question.
    Unless the user specifies in the question a specific number of examples to obtain, query for at most 5 results using the LIMIT clause as per Postgres. You can order the results to return the most informative data in the database.
    Never query for all columns from a table. You must query only the columns that are needed to answer the question. Wrap each column name in double quotes (") to denote them as delimited identifiers.
    Pay attention to use only the column names you can see in the tables below. Be careful to not query for columns that do not exist. Also, pay attention to which column is in which table.
    Pay attention to use date('now') function to get the current date, if the question involves "today".

    Use the following format:

    Question: <Question here>
    SQLQuery: <SQL Query to run>
    product_id: <Product id>
    SQLResult: <Result of the SQLQuery>
    Answer: <Final answer here>

    Only use the following tables:

                       Table "public.makers_ecommerce_products"
            Column        |          Type          | Collation | Nullable | Default
     ---------------------+------------------------+-----------+----------+---------
      product_id          | integer                |           | not null |
      product_name        | character varying(255) |           | not null |
      product_image       | text                   |           |          |
      product_link        | text                   |           | not null |
      product_ratings     | character varying(100) |           |          |
      rating_count        | character varying(100) |           |          |
      product_description | text                   |           |          |
      fetch_date          | date                   |           | not null |
      product_price       | text                   |           | not null |
      product_category    | character varying(100) |           |          |
      product_store       | character varying(100) |           | not null |
     Indexes:
         "makers_ecommerce_products_pkey" PRIMARY KEY, btree (product_id)

     QUESTION: {context}
     SQLQuery:
     `,
    );

    const combineDocsChain = await createStuffDocumentsChain({
        llm: ollama,
        prompt,
    });

    const ragChain = await createRetrievalChain({
        retriever,
        combineDocsChain,
    });

    return ragChain;
}
