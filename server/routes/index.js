'use strict';

let express = require('express');
let pg = require('pg');
let path = require('path');
let router = express.Router();
let connectionString = require(path.join(__dirname, '../', '../', 'config'));

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

//GET for products with names longer than 100 characters
router.get('/api/products/longerthan100', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if (err) {
            done();
            return res.status(500).json({success: false, data: err})
        }

        //SQL Query > Select 50 Data with a longer length than 100
        let query1 = client.query('SELECT name, sku, price, imageurl FROM product WHERE LENGTH(name) > 100 ' +
            'ORDER BY LENGTH(name), name LIMIT 50;');
        /*
        let query2 = client.query('SELECT name, sku, price, imageurl FROM product WHERE LENGTH(name) < 20 ' +
            'ORDER BY LENGTH(name), name LIMIT 50;');
        let query3 = client.query('SELECT name, sku, price, imageurl FROM product ORDER BY price DESC LIMIT 10;');
        let query4 = client.query('SELECT name, sku, price, imageurl FROM product ORDER BY price ASC LIMIT 10;');
        let query5 = client.query("SELECT name, description ,sku, price, imageurl, groupid, count(groupid) FROM product " +
            "GROUP BY name, description, sku, price, imageurl, groupid HAVING count(groupid) > 1;");
        let query6 = client.query("SELECT name, description ,sku, price, imageurl, count(name) FROM product " +
            "GROUP BY name, description, sku, price, imageurl HAVING count(name) > 1;");
        */
        //Stream results back one row at a time
        query1.on('row', (row)=> {
            results.push(row);
        });

        //After all data is returned, close connection and return results
        query1.on('end', () => {
            done();
            return res.json(results);
        })
    })
});


//GET for products with shorterthan20 characters
router.get('/api/products/shorterthan20', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if (err) {
            done();
            return res.status(500).json({success: false, data: err})
        }

        //SQL Query > Select 50 Data with a shorter length than 20
        let query = client.query('SELECT name, sku, price, imageurl FROM product WHERE LENGTH(name) < 20 ' +
            'ORDER BY LENGTH(name), name LIMIT 50;');

        //Stream results back one row at a time
        query.on('row', (row)=> {
            results.push(row);
        });

        //After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        })
    })
});


//GET for the 10 most expensive products
router.get('/api/products/10mostexpensive', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if (err) {
            done();
            return res.status(500).json({success: false, data: err})
        }

        //SQL Query > Select 10 most expensive products
        let query = client.query('SELECT name, sku, price, imageurl FROM product ORDER BY price DESC LIMIT 10;');

        //Stream results back one row at a time
        query.on('row', (row)=> {
            results.push(row);
        });

        //After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        })
    })
});

//GET for the 10 least expensive products
router.get('/api/products/10leastexpensive', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if (err) {
            done();
            return res.status(500).json({success: false, data: err})
        }

        //SQL Query > Select 10 least expensive products
        let query = client.query('SELECT name, sku, price, imageurl FROM product ORDER BY price ASC LIMIT 10;');


        //Stream results back one row at a time
        query.on('row', (row)=> {
            results.push(row);
        });

        //After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        })
    })
});



router.get('/api/products/samegroupid', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if (err) {
            done();
            return res.status(500).json({success: false, data: err})
        }

        //SQL Query > Select products with no description
        let query = client.query("SELECT name, description ,sku, price, imageurl, groupid, count(groupid) FROM product " +
            "GROUP BY name, description, sku, price, imageurl, groupid HAVING count(groupid) > 1;");

        //Stream results back one row at a time
        query.on('row', (row)=> {
            results.push(row);
        });

        //After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        })
    })
});

router.get('/api/products/samename', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if (err) {
            done();
            return res.status(500).json({success: false, data: err})
        }

        //SQL Query > Select products with no description
        let query = client.query("SELECT name, description ,sku, price, imageurl, count(name) FROM product " +
            "GROUP BY name, description, sku, price, imageurl HAVING count(name) > 1;");

        //Stream results back one row at a time
        query.on('row', (row)=> {
            results.push(row);
        });

        //After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        })
    })
});
module.exports = router;

//same group-id
//same name but not sam group-id
//price between 0 and 20, 20 and 40