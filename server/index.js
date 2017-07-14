"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");

// The `data-helpers` module provides an interface to the

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const DB            = require("mongodb");   //makes sure that mongodb is required to run the file
const MONGODB_URI   = "mongodb://localhost:27017/tweetr";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    // console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  const DataHelpers = require("./lib/data-helpers.js")(db);   //linking to the data-helpers and tweets files
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
  app.listen(PORT, () => {
   // console.log("Example app listening on port " + PORT); //8080
  });
});
