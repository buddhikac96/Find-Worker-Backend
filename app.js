const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const keys = require("./config/keys");
const mainRoutes = require("./routes/routes");

const app = express();
const isAuth = require("./routes/middlewares/isAuth");


const OriginWhiteListing = (req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true)
  res.header("Access-Control-Allow-Origin",req.get('origin'))
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next()
 
}

app.use(OriginWhiteListing)
app.options('*', (req,res,next)=>{
  res.status(200).send()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: keys.session.secret,
    resave: true,
    saveUninitialized: true
  })
);


// Custom Middleware
//app.use(isAuth);

// Use Routes
app.use(mainRoutes);

module.exports = app;