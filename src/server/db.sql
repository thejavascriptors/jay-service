
CREATE DATABASE sdc;

IF EXISTS one DROP TABLE one

CREATE TABLE one(
  id SERIAL PRIMARY KEY,
  product VARCHAR(255)
)