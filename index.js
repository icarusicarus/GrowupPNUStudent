const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
var expressSession = require("express-session");
var mysql = require("mysql");

dotenv.config();

const { sequelize } = require('./models');

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
    expressSession({
      secret: "illegator",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000 * 60,
      },
    })
  );
  
sequelize.sync({ force: false })
    .then(() => {
        console.log("[Success] Database Connect");
    })
    .catch((err) => {
    console.error(err);
    });

var mainRouter = require("./router/main");
var choiceRouter = require("./router/choice");
var loginRouter = require("./router/login");
var registerRouter = require("./router/register");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/',mainRouter);
app.use('/choice',choiceRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);

app.listen(app.get('port'),function(){
    console.log('[Listening] localhost @',app.get('port'));
});