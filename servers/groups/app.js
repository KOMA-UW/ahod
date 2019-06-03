const express = require("express");
const bodyParser = require("body-parser");

const Group = require("./models/group");
const Member = require("./models/member");
const {mongoose, connect} = require("./db/mongoose");

var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

const app = express();
const path = require("path");
const flash = require('express-flash');

const groupRoutes = require("./routes/group");
const memberRoutes = require("./routes/member");

const addr = process.env.ADDR || ":80";
var [host, port] = addr.split(":");

port = parseInt(port)
if (isNaN(port)) {
    throw new Error("port number is not a number");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());  // for to notify users about success and error messages

app.listen(4001, host, function() {
  console.log('Listening on port 80');
  connect()
    .then(_ => {
      console.log('connected to mongo');
      app.use("/images", express.static(path.join(__dirname, "images"))); // any request that is targeting /images should be allowed
      app.use("/v1/groups", groupRoutes); // connect the routes to the app
      app.use("/v1/members", memberRoutes);
    })
    .catch(e => {
      console.log("error connecting to mongo");
      console.log(e);
  })
})

module.exports = app;
