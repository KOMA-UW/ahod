const express = require("express");
const bodyParser = require("body-parser");

const Group = require("./models/group");
const Member = require("./models/member");
const {mongoos,connect} = require("./db/mongoose");
const mysql = require("mysql");

const app = express();
const path = require("path");

const groupRoutes = require("./routes/group");
const memberRoutes = require("./routes/member");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, function() {
  console.log('Listening on port 80');
  connect()
    .then(_ => {
      console.log('connected to mongo');
      app.use("/v1/groups", groupRoutes); // connect the routes to the app
    })
    .catch(e => {
      console.log("error connecting to mongo");
      console.log(e);
  })
})

// app.use("/v1/groups", groupRoutes); // connect the routes to the app
// // app.use("/v1/member", memberRoutes);

module.exports = app;
