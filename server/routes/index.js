'use strict';

let express = require('express');
let pg = require('pg');
let path = require('path');
let router = express.Router();
let connectionString = require(path.join(__dirname, '../', '../', 'config'));

//GET for products with names longer than 100 characters
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});

router.get('/api/products/longerthan100', (req, res) => {
  let results = [];

  //Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    //Handle connection errors
    if(err){
      done();
      return res.status(500).json({ success: false, data: err})
    }

    //SQL Query > Select 50 Data with a longer length than 100
    let query = client.query('SELECT name, sku, price, imageurl FROM product WHERE LENGTH(name) > 100 ' +
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


//GET for products with shorterthan20 characters
router.get('/api/products/shorterthan20', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if(err){
            done();
            return res.status(500).json({ success: false, data: err})
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
        if(err){
            done();
            return res.status(500).json({ success: false, data: err})
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
        if(err){
            done();
            return res.status(500).json({ success: false, data: err})
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


//GET for products with no description
router.get('/api/products/nodescription', (req, res) => {
    let results = [];

    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle connection errors
        if(err){
            done();
            return res.status(500).json({ success: false, data: err})
        }

        //SQL Query > Select products with no description
        let query = client.query("SELECT name, description ,sku, price, imageurl FROM product " +
            "WHERE description = '' ORDER BY price ASC LIMIT 10;");

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