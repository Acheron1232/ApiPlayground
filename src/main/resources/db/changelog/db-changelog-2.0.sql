--liquibase formatted sql

--changeset acheron:1
create table message(
                        id serial primary key ,
                        sender text,
                        content text,
                        time timestamp,
                        color text
)