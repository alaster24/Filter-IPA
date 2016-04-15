'use strict';

let httpreq = require('httpreq');
let path = require('path');

let url = 'https://balder.pthor.ch/media/exports/csv/product-feed-full.csv';

httpreq.download(url, path.join(__dirname, '../resources/product-feed-full.csv'), function(err, progress) {
    if (err) return console.log(err);
    console.log(progress);
}, function(err, res) {
    if (err) return console.log(err);
    console.log(res);
});