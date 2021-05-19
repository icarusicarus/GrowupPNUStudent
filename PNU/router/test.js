const express = require('express');
const router = express.Router();

router.get('/',async function(req,res){
    //console.log('[main.js] Main page loading...');
    res.render('test');
});

module.exports = router;