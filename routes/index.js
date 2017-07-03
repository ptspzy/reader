var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs')
var ebook = path.join(__dirname, "../public/ebook");
/* GET home page. */
router.get('/', function(req, res, next) {
    var fs = require('fs');
    fs.readdir(ebook, function(err, names) { //names为目录下的文件数组列表
        if (err) {
            return console.log(err);
        } else {
            res.render('index', { title: 'Reader', book: names });
        }
    });
});

router.get('/book/:filename', function(req, res, next) {

    var fileName = req.params.filename;
    var filePath = path.join(ebook, '/1.txt')

    console.log(filePath)
        // var data = fs.readFileSync(filePath, 'utf8');
        // res.send("<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>");
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
        //console.log(error)
        if (err) throw err;
        console.log(data);
        //return "<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>";
        res.send("<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>");
        //res.send("{'aa':'bb'}");
    });
});

module.exports = router;