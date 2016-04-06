"use strict";

//Modules required
const pg = require('pg');
const path = require('path');
let connectionString = require(path.join(__dirname, '../', '../', 'config'));

let client = new pg.Client(connectionString);
client.connect();
//creating new database
let query = client.query('CREATE TABLE product(name VARCHAR(1000), description VARCHAR(10000),' +
    'url VARCHAR(2000), sku VARCHAR(1000), price NUMERIC(100,5), inStock VARCHAR(1000), imageUrl VARCHAR(2000), ' +
    'groupId VARCHAR(1000), categories VARCHAR(1000), topsellerL1 REAL, topsellerL2 REAL, ' +
    'topsellerL3 REAL, topsellerHome REAL, productScore REAL, manualTags VARCHAR(1000));' +
    'COPY product(name, description, url, sku, price, inStock, imageUrl, groupId, categories, topsellerL1,' +
    'topsellerL2, topsellerL3, topsellerHome, productScore, manualTags) ' +
    "FROM '/home/alaster/Downloads/product-feed-full.csv' WITH CSV HEADER delimiter ',';" +
    'DELETE FROM product WHERE ctid IN (SELECT ctid FROM product ORDER BY instock ASC LIMIT 1);' +
    "ALTER TABLE product ALTER instock TYPE boolean USING CASE instock WHEN 'True' THEN TRUE ELSE FALSE END;");
query.on('end', () => { client.end(); });