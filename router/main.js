const express = require('express');
const router = express.Router();

router.get('/',async function(req,res){
    console.log("[main.js] Main page loading...");
    if (req.session.loggedin) {
        res.render('tutorial', { uid: req.session.uid });
        console.log("Permisson OK!");
    } else {
        res.render('main');
    }
});


module.exports = router;