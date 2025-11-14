-- liquibase formatted sql

-- changeset bona:20251113-02-create-products-table
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DOUBLE NOT NULL,
    image TINYBLOB,
    CONSTRAINT pk_products PRIMARY KEY (id)
);