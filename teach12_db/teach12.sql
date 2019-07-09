CREATE TABLE teach12Account (
    account_ID_PK       serial not null primary key,    -- account ID
    account_name        varchar(80) not null unique,    -- additional unique marker
    account_HASH        varchar(255) not null unique    -- password HASH
);