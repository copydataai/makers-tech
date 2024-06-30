CREATE TABLE IF NOT EXISTS "makers_ecommerce_products" (
	"product_id" integer PRIMARY KEY NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"product_image" text,
	"product_link" text NOT NULL,
	"product_ratings" varchar(100),
	"rating_count" varchar(100),
	"product_description" text,
	"fetch_date" date NOT NULL,
	"product_price" text NOT NULL,
	"product_category" varchar(100),
	"product_store" varchar(100) NOT NULL
);
