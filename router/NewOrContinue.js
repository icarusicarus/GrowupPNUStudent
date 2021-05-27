//지금 사용되지 않으므로 후에 필요없다면 삭제

const express = require('express');
const router = express.Router();

router.get('/',async function(req,res){
    //console.log('[main.js] Main page loading...');
    res.render('NewOrContinue');
});

module.exports = router;