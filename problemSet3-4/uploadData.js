const MongoClient = require('mongodb').MongoClient;
const csv = require('csv-parser');
const fs = require('fs');
const url = 'mongodb+srv://shuo:db_123456@nodejsstudy.x2v6zgg.mongodb.net/?retryWrites=true&w=majority&appName=nodejsStudy';  // MongoDB connection string
const dbName = 'ps3-4';  // Database name

async function uploadData() {
    const client = new MongoClient(url);
    
    try {
      // Connect to the MongoDB client
      await client.connect();
      console.log("Connected to MongoDB server");
      const db = client.db(dbName);
      const collection = db.collection('places');
  
      // Read the CSV file
      fs.createReadStream('zips.csv')
        .pipe(csv())
        .on('data', async (row) => {
          const place = row['place'];
          const zip = row['zip'];
  
          // Insert or update the place data
          const result = await collection.findOneAndUpdate(
            { place: place },
            { $addToSet: { zips: zip } },
            { upsert: true }
          );
  
          if (result.lastErrorObject.upserted) {
            console.log(`Added new place: ${place} with zip ${zip}`);
          } else {
            console.log(`Updated ${place} with zip ${zip}`);
          }
        })
        .on('end', () => {
          console.log('CSV file has been processed.');
          client.close();
        });
    } catch (err) {
      console.error('An error occurred:', err);
      client.close();
    }
  }
  
  uploadData();
  