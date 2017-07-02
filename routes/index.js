var express = require('express');
var router = express.Router();
var path = require('path');
var ebook = path.join(__dirname, "../public/ebook");
/* GET home page. */
router.get('/', function (req, res, next) {
    var fs = require('fs');
    fs.readdir(ebook, function (err, names) {    //names为目录下的文件数组列表
        if (err) {
            return console.log(err);
        }
        else {
            res.render('index', {title: 'Reader', book: names});
        }
    });
});

router.get('book/:filename', function (req, res, next) {

    var fileName = req.params.filename;
    var filePath = path.join(ebook, '/1.txt')

    console.log(filePath)

    // fs.readFile(filePath, "utf-8", function (error, data) {
    //     //console.log(error)
    //     if (error) {
    //         console.log(error)
    //         return;
    //     }
    //     //console.log(data);
    //     //return "<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>";
    //     //res.json("<p>" + data.replace(/\r\n/g, "</p><p>") + "</p>")
    //     res.json("{'aa':'bb'}");
    // });
});

module.exports = router;
