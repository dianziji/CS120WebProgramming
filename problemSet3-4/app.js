const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://syang22:7LT1y9ExIy0MfhIn@cs120db.qz5se4e.mongodb.net/?retryWrites=true&w=majority&appName=cs120db";
const dbName = "problemSet3-4";
const client = new MongoClient(url);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/process", async (req, res) => {
  const input = req.body.searchInput;
  const isZip = /^\d/.test(input); // Check if input starts with a number

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("places");
    console.log("Connected successfully to server");
    let result;
    if (isZip) {
      result = await collection.findOne({ zips: { $in: [input] } });
    } else {
      result = await collection.findOne({ place: input });
    }

    res.render("result", { query: input, result });
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await client.close();
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on port ${port}");
});
