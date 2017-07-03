/**
 * Module dependencies.
 */
var path = require('path');
var cfg = require('./config.js');

/* load express */
var express = require('express');
var app = express();

app.disable('x-powered-by');

/* register view engine */
// app.engine('.html',require('ejs'));// set .html as the default extension
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* register static file middleware */
// Reference: http://www.expressjs.com.cn/4x/api.html#app.use
app.use(express.static(path.join(__dirname, cfg.static_file_folder)));

/* register cookie parser */
var cookieParser = require('cookie-parser');
app.use(cookieParser());

/* register route */
var registerRoutes = require('./routes.js');
registerRoutes(app);

module.exports = app;
