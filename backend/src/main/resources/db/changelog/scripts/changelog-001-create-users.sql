-- liquibase formatted sql

-- changeset bona:20250910-01-create-users-table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);
ALTER TABLE users ADD CONSTRAINT UQ_USERS_EMAIL UNIQUE (email);
