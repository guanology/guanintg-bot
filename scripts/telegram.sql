create table TelegramUsers
(
    id         integer      not null
        constraint telegram_users_pk
            primary key,
    first_name varchar(255) not null,
    last_name  varchar(255),
    username   varchar(255)
);

create unique index telegram_users_id_uindex
    on TelegramUsers (id);
