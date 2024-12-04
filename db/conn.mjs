import { MOngoClient } from "mogodb";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Ensure that ATLAS_URI is defined in your .env file
if (!process.env.ATLAS_URI) {
  throw new Error("ATLAS_URI is undefined. Please check your .env file.");
}

const client = new MongoClient(process.env.ATLAS_URI); // MongoClient initialized with the URI
let conn; // Declare a db variable to hold the database connection

let conn;
try {
  conn = await client.connect();
  console.log("connected");
} catch (err) {
  console.log(err);
}
// we are accessing the sample training database in the mongoDB compass sample data
let db = conn.db("sample_training");
export default db;
