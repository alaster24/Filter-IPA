'use strict';

let express = require('express');
let pg = require('pg');
let path = require('path');
let router = express.Router();
let connectionString = require(path.join(__dirname, '../../', 'config'));

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../', 'client', 'views', 'index.html'));
});

function getDataForQuery(res, sqlStatement) {
    let queryResults = [];
    // postgres client
    pg.connect(connectionString, (err, client, done) => {
        // this handles the errors
        if (err) {
            done();
            return res.status(500).json({success: false, data: err})
        }
        // query => Based on function parameter sqlStatement
        let query = client.query(sqlStatement);
        // get results and push it in the array
        query.on('row', (row)=> {
            queryResults.push(row);
        });
        // close connection and return results
        query.on('end', () => {
            done();
            return res.json(queryResults);
        })
    })
}

// GET for products with names longer than 100 characters
router.get('/api/products/longerthan100', (req, res) => {
    return getDataForQuery(res, ''
            + 'SELECT name, sku, price, imageurl '
            + 'FROM product '
            + 'WHERE LENGTH(name) > 100 '
            + 'ORDER BY LENGTH(name), name '
            + 'LIMIT 50;');
});


// GET for products with shorterthan20 characters
router.get('/api/products/shorterthan20', (req, res) => {
    return getDataForQuery(res, ''
            + 'SELECT name, sku, price, imageurl '
            + 'FROM product '
            + 'WHERE LENGTH(name) < 20 '
            + 'ORDER BY LENGTH(name), name '
            + 'LIMIT 50;');
});


// GET for the 10 most expensive products
router.get('/api/products/10mostexpensive', (req, res) => {
    return getDataForQuery(res, ''
            + 'SELECT name, sku, price, imageurl '
            + 'FROM product '
            + 'ORDER BY price DESC '
            + 'LIMIT 10;');
});

// GET for the 10 least expensive products
router.get('/api/products/10leastexpensive', (req, res) => {
    return getDataForQuery(res, ''
            + 'SELECT name, sku, price, imageurl '
            + 'FROM product '
            + 'ORDER BY price ASC '
            + 'LIMIT 10;');
});


router.get('/api/products/samegroupid', (req, res) => {
    return getDataForQuery(res, ''
            + 'SELECT name, description ,sku, price, imageurl, groupid, count(groupid) '
            + 'FROM product '
            + 'GROUP BY name, description, sku, price, imageurl, groupid '
            + 'HAVING count(groupid) > 1;');
});

router.get('/api/products/samename', (req, res) => {
    return getDataForQuery(res, ''
            + 'SELECT name, description ,sku, price, imageurl, count(name) '
            + 'FROM product '
            + 'GROUP BY name, description, sku, price, imageurl '
            + 'HAVING count(name) > 1;');
});

module.exports = router;
