const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", "./views");
app.set("view engine", "ejs");

var mainRouter = require("./router/main");
var NewOrContinueRouter = require("./router/NewOrContinue");
var SignUpRouter = require("./router/SignUp");
var tutorialRouter = require("./router/tutorial");
var MainPageRouter = require("./router/MainPage");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/',mainRouter);
app.use('/NewOrContinue',NewOrContinueRouter);
app.use('/SignUp',SignUpRouter);
app.use('/tutorial',tutorialRouter);
app.use('/MainPage',MainPageRouter);

app.listen(app.get('port'),function(){
    console.log('[Listening] localhost @',app.get('port'));
});