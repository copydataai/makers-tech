# Makers Tech
> We are the amazon but without the manual interface just a chat

## Tech stack
- T3 stack
 - tRPC
 - Drizzle
 - next-auth
- LangChain
- Gemma2
- Ollama

## Dataset
[e-commerce-tech-dataset](https://www.kaggle.com/datasets/hassanali699/e-commerce-tech-dataset?resource=download)
 
## Pitch
> Enable efficient e-commerce without the complexity of platforms like Amazon or Shopify. Our chat-based solution offers real-time inventory checks and payment links through simple customer service interactions. Save development time by quickly creating a basic MVP, focusing on product optimization and seamless transactions. Delegate billing to trusted platforms like Stripe or LemonSqueezy, allowing you to concentrate on your core business. Solving the problem to a big variety of products to search and find the ideal product just by chat not overwhelming using complex webs or exploiting your attention.


## Schemas & SQL

``` sql
CREATE TABLE ecommerce_products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT,
    product_link TEXT NOT NULL,
    product_ratings DECIMAL(3,2),
    rating_count INT,
    product_description TEXT,
    fetch_date DATE NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    product_category VARCHAR(100),
    product_store VARCHAR(100) NOT NULL
);

```


## schema sh
``` sh
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
```
