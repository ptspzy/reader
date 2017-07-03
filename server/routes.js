var routeRegister = function(app) {

    /* register page routes */
    app.use('/', require('./routes/index.js'));
   
    /* 404 */
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });

};

module.exports = routeRegister;