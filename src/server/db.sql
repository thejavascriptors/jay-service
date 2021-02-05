
\c sdc

DROP TABLE products, features, images;

CREATE TABLE products(
  product_id VARCHAR(255),
  title VARCHAR(255),
  shorthand VARCHAR(255),
  brand VARCHAR(255),
  price VARCHAR(255),
  stock VARCHAR(255),
  stars VARCHAR(255),
  ratings VARCHAR(255),
  shipDate VARCHAR(255),
  shipSupplier VARCHAR(255),
  PRIMARY KEY(product_id)
);

CREATE TABLE features(
  product_id VARCHAR(255),
  feature VARCHAR(255),
  CONSTRAINT products
    FOREIGN KEY(product_id)
	    REFERENCES products(product_id)
);

CREATE TABLE images(
  product_id VARCHAR(255),
  imageURL VARCHAR(255),
  descriptions VARCHAR(255),
  CONSTRAINT products
    FOREIGN KEY(product_id)
	    REFERENCES products(product_id)
);

CREATE INDEX product_feature_id ON features(product_id);
CREATE INDEX product_image_id ON images(product_id);

