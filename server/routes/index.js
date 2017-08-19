var express = require('express');
var router = express.Router();
var cfg = require('../config.js');
var fs = require('fs');
var path = require('path');
var iconv = require('iconv-lite');  
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
    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.render('error', {
                error: err
            });
            return;
        }
        data = iconv.decode(data, 'gbk')
        
        var content = "<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>";
        res.render('reader', {
            title: fileName.split('.')[0],
            content: content
        })
    });
});

module.exports = router;
