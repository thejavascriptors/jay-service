
\c sdc

DROP TABLE products, features, images;

CREATE TABLE products(
  id VARCHAR(255),
  title VARCHAR(255),
  shorthand VARCHAR(255),
  brand VARCHAR(255),
  price VARCHAR(255),
  stock INT,
  stars INT,
  ratings INT,
  shipDate VARCHAR(255),
  shipSupplier VARCHAR(255)
);

CREATE TABLE features(
  id VARCHAR(255),
  feature VARCHAR(255)
);

CREATE TABLE images(
  id VARCHAR(255),
  imageURL VARCHAR(255),
  descriptions VARCHAR(255)
);

