var express = require('express');
var router = express.Router();
var cfg = require('../config.js');
var fs = require('fs');
var path = require('path');
var bookPath = path.join(__dirname, "../books/");

router.get('/', function (req, res) {

    fs.readdir(bookPath, function (err, names) {    //names为目录下的文件数组列表
        if (err) {
            res.render('error', {
                error: err
            })
        }
        else {
            res.render('index', {
                title: '阅读列表',
                books: names
            });
        }
    })
});

router.get('/book/:filename', function (req, res) {

    var fileName = req.params.filename;
    var filePath = bookPath + fileName;
    fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            res.render('error', {
                error: err
            });
            return;
        }
        var content = "<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>";
        res.render('reader', {
            title: '阅读',
            content: content
        })
    });
});

module.exports = router;
