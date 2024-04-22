const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://syang22:7LT1y9ExIy0MfhIn@cs120db.qz5se4e.mongodb.net/?retryWrites=true&w=majority&appName=cs120db";
const connStr =
  "mongodb+srv://syang22:7LT1y9ExIy0MfhIn@cs120db.qz5se4e.mongodb.net/?retryWrites=true&w=majority&appName=cs120db";
console.log("hey");
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(err);
  } else {
    var dbo = db.db("library");
    var collection = dbo.collection("books");
    console.log("Success!");
    db.close();
  }
});
