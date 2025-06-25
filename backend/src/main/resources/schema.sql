-- Drop existing table if exist
DROP TABLE IF EXISTS product;

-- Create table
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(19,2) NOT NULL CHECK (price > 0),
    description VARCHAR(500),
    quantity INT NOT NULL CHECK (quantity >= 0)
);

