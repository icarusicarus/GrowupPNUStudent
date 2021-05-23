const express = require("express");
const fs = require("fs");
const url = require('url');
const crypto = require("crypto");
const router = express.Router();
const { User } = require('../models');

var loginPage = function (req, res, alert) {
    res.render("main.ejs", {
        msg: alert,
    });
};

router.route('/')
    .get(async (req, res, next) => {
        console.log(req.session.loggedin);
        if (req.session.loggedin == undefined) {
            console.log("[Login GET] Login page loading...");
            loginPage(req, res);
        } else {
            console.log("[Login GET] Already loggedin. Go to main page.");
            res.render('main', { uid: uid })
        }
    })
    .post(async (req, res, next) => {
        console.log("[Login POST]");
        const id = req.body.id;
        const pw = req.body.pw;

        if (id && pw) {
            const hashPW = await getHashPW(id, pw);
            if (!hashPw) {
                console.log("Login fail, redirect login page");
                loginPage(req, res, "No such user! You need to register.");
            } else {
                try {
                    const login = await User.findOne({
                        where: {
                            username: id,
                            password: hashPw
                        }
                    }, { raw: true });

                    var logged = login.username;

                    if (logged) {
                            req.session.loggedin = true;
                            req.session.uid = id;
                            res.redirect('/');
                            console.log("Permisson OK!");
                        
                    }
                } catch (err) {
                    console.error(err);
                    loginPage(req, res, "No such user! You need to register.");
                }
            }
        }
    })

async function getHashPW(username, pw, callback) {
    const result = await User.findAll({
        attributes: ['salt'],
        where: { username: username }
    }, { raw: true });

    var salt = result[0].salt;
    var hashPW;
    if (salt) {
        hashPw = crypto
            .pbkdf2Sync(pw, salt, 100, 64, "sha512")
            .toString("base64");
    } else {
        console.log("[Error] getHashPW: Can't find correspond ID.");
        return 0;
    }
    return hashPw;
}

module.exports = router;