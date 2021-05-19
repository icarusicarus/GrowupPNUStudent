const express = require('express');
const router = express.Router();

router.get('/', async function(req, res){
    console.log('[choice.js]');
    res.send('hmm');
});

router.get('/:num',async function(req,res){
    console.log('[choice.js] Choosen page loading...');
    const c = parseInt(req.params.num);
    console.log(c);
    if (c == 1) {
        res.render('choice1');    //choic.ejs 파일 렌더링
        //res.send('choice1'); //choice1이라는 문자열 출력
    } else {
        res.render('choice2');
    }

});

module.exports = router;