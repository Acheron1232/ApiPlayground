--liquibase formatted sql

--changeset acheron:1
create table users
(
    id         serial primary key,
    username   text,
    age        int,
    occupation text
)