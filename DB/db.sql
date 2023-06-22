-- to get list of database 

--command to run Postgres is psql

CREATE DATABASE yelp; 

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(100) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

INSERT INTO restaurants (name,location,price_range) VALUES('McDonalds','new york',3);
INSERT INTO restaurants (name,location,price_range) VALUES('Pizza Hut','new york',2);
INSERT INTO restaurants (name,location,price_range) VALUES('Chick Fill A','boston',4);

INSERT INTO reviews (restaurant_id,name,review,rating) VALUES(1,'Marie','Service was slow',2);
INSERT INTO reviews (restaurant_id,name,review,rating) VALUES(1,'Joe','Staffs were rude',1);
INSERT INTO reviews (restaurant_id,name,review,rating) VALUES(1,'Pratyush','The manager treated our family well',3);
INSERT INTO reviews (restaurant_id,name,review,rating) VALUES(4,'Scott','Great food and great vibes',4);

