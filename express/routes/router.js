const express = require('express');
const router = express.Router([{
    mergeParams: true
}]);

const APIController = require('./apiController');
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

router.use('/api', APIController);





module.exports = router;