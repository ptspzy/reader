var express = require('express');
var router = express.Router();
var cfg = require('../config.js');
var fs = require('fs')
var path = require('path')

router.get('/', function (req, res, next) {
});

router.get('/book/:filename', function(req, res) {

    var fileName = req.params.filename;
    fileName = '1.txt'
    var filePath = path.join(__dirname, "../books/" + fileName)        
    console.log(fileName)
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
        if (err) throw err;
        var content = "<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>";
        res.render('reader',{
            title:'阅读',
            content:content
        })
    });
});

module.exports = router;