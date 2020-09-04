#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "corporate_portal";
  GRANT ALL PRIVILEGES ON DATABASE corporate_portal TO postgres;
EOSQL
