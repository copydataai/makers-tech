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
 
## Pitch
> Enabling an agent chat to check products without need to develop a complex platform like Amazon, Shopify, Etsy, etc. 
> Just using a simple chat as customer service to provide a real-time inventory and provide links to do payments.
- reducing the time to develop a basic MVP of the ecommerce and focusing on the products and optimize the transactions, delegating the billing to other platforms like stripe, lemonsqueazy, etc.
- fast MVP to get an informative conduct about the 


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
 date                | character varying(50)  |           |          |
Indexes:
    "makers_ecommerce_products_pkey" PRIMARY KEY, btree (product_id)
```


export const ecommerceProducts = createTable("ecommerce_products", {
  productID: integer("product_id").primaryKey(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  productImage: text("product_image"),
  productLink: text("product_link").notNull(),
  productRatings: varchar("product_ratings", { length: 100 }),
  ratingCount: varchar("rating_count", { length: 100 }),
  productDescription: text("product_description"),
  fetchDate: date("fetch_date").notNull(),
  productPrice: text("product_price").notNull(),
  productCategory: varchar("product_category", { length: 100 }),
  productStore: varchar("product_store", { length: 100 }).notNull(),
});
