import dotenv from "dotenv"; // Correct import for dotenv
import mongodb from "mongodb"; // Import MongoClient from the mongodb package

dotenv.config(); // Load environment variables

// Ensure that ATLAS_URI is defined in your .env file
if (!process.env.ATLAS_URI) {
  throw new Error("ATLAS_URI is undefined. Please check your .env file.");
}

const client = new MongoClient(process.env.ATLAS_URI); // MongoClient initialized with the URI
let db; // Declare a db variable to hold the database connection

// Function to connect to the database
export const connectDB = async () => {
  if (!db) {
    // Only connect if db is not already connected
    console.log("Connecting to the database...");
    try {
      const conn = await client.connect(); // Connect to MongoDB
      db = conn.db("grades_agg"); // Use the database `grades_agg`
      console.log("Database connected successfully");
    } catch (e) {
      console.error("Error connecting to the database:", e); // Handle connection errors
      throw e; // Throw error if connection fails
    }
  }
  return db; // Return the db connection
};

// Named export of db for other files to use if needed
export { db };
