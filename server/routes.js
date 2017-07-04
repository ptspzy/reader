var routeRegister = function(app) {

    /* register page routes */
    app.use('/', require('./routes/index.js'));
   
    /* 404 */
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.render('error');
        }
    });

};

module.exports = routeRegister;
