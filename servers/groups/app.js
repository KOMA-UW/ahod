"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { mongoos, connect } = require("./db/mongoose");
const path = require("path");

const Group = require("./models/group");
const Member = require("./models/member");

// Constants
const PORT = 80;
const HOST = "0.0.0.0";

const groupRoutes = require("./routes/group");
const memberRoutes = require("./routes/member");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(80, function() {
  console.log("Listening on port 80");
  app.get("/v1/groups", (req, res) => {
    res.send("Hello world\n");
  });
  connect()
    .then(_ => {
      console.log("connected to mongo");
      app.use("/v1/groups", groupRoutes); // connect the routes to the app
    })
    .catch(e => {
      console.log("error connecting to mongo");
      console.log(e);
    });
});

// // app.use("/v1/groups", groupRoutes); // connect the routes to the app
// // // app.use("/v1/member", memberRoutes);

module.exports = app;

// App

// app.get("/v1/groups", (req, res) => {
//   res.send("Hello world 2\n");
// });

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
