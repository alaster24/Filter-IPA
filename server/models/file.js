'use strict';

let httpreq = require('httpreq');
let url = 'https://balder.pthor.ch/media/exports/csv/product-feed-full.csv';

httpreq.download(
    url,
    __dirname + '/product-feed-full.csv'
    , function (err, progress){
        if (err) return console.log(err);
        console.log(progress);
    }, function (err, res){
        if (err) return console.log(err);
        console.log(res);
    });