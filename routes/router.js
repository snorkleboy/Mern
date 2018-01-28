const express = require('express');
const router = express.Router();
const stockController = require('./stockController');
router.use(function timeLog(req, res, next) {
    console.log('in top router controller');
    console.log('Time: ', Date.now());
    console.log('IP', req.ip);
    // console.log('request', req.originalUrl, req.params, req.body);
    // console.log();
    next();
});

//router.all('/api/*', requireAuthentication);
// res.locals.user = req.user;
// res.locals.authenticated = !req.user.anonymous;
//


router.use('/api/stocks', stockController);


// catch 404 and forward to error handler
router.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
router.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ 'error': err});
});



module.exports = router;