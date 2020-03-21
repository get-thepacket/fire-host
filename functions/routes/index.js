var express = require('express'),
    router = express.Router();

router.get('/',(req,res,next)=> {
    res.render('index',{layout : 'default', template:"home-template"});
});

module.exports = router;