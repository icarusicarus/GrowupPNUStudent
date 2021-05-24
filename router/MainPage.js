const express = require('express');
const router = express.Router();

router.get('/',async function(req,res){
    res.render('MainPage');
});

router.get('/sugang',async function(req,res){
    res.render('sugang');
});

router.get('/freeTime',async function(req,res){
    res.render('freeTime');
});


module.exports = router;