"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweetr";


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;

  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  function loopy (err, tweets) {
      if (err) throw err;

      console.log("Logging each tweet: ");
      for (let tweet of tweets) {
        console.log(tweet);
        }
    }

  getTweets(loopy);
    db.close();
  });
});