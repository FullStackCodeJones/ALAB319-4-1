import express from "express";
import { db } from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  let collection = await db.collection("grades");
  let newDocument = req.body;

  // Rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  let result = await collection.insertOne(newDocument);
  if (result.acknowledged) {
    res.status(201).send(result);
  } else {
    res.status(400).send("Error inserting grade");
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result);
  }
});

export default db;
