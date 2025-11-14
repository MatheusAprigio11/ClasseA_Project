--liquibase formatted sql

--changeset bona:add-role-column-to-users
ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'USER';
