"use strict";


const simulateDelay = require("./util/simulate-delay");
//responsible for delay simluation. (Commonly seen with filesystem operations)

module.exports = function makeDataHelpers(db) {
  return {


    saveTweet: function(newTweet, callback) {             //function to save the tweet to the "DB file"
      db.collection("tweets").insert(newTweet, function(err, data){
        if (err) {
          callback(err);
        } else {
          callback(null, data);
        }
      });
    },

//function to get tweets by newest first.
    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, data) => {
        if (err){
          callback(err);
        } else {
          callback(null, data);
        }
      });
    }
  };
}