--liquibase formatted sql

--changeset bona:add-active-column-in-products
ALTER TABLE products ADD COLUMN active BOOLEAN NOT NULL DEFAULT TRUE;