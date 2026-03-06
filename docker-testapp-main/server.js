const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://admin:qwerty@mongo:27017/?authSource=admin";
const client = new MongoClient(MONGO_URL);

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    const db = client.db("apnacollege-db");
    const data = await db.collection("users").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(500).send("Error fetching users");
  }
});

// POST new user
app.post("/addUser", async (req, res) => {
  try {
    const userObj = req.body;
    console.log("New user payload:", userObj);

    const db = client.db("apnacollege-db");
    const result = await db.collection("users").insertOne(userObj);
    console.log("data inserted in DB", result.insertedId);

    res.status(201).json({ message: "User created", id: result.insertedId });
  } catch (err) {
    console.error("Error inserting user", err);
    res.status(500).send("Error inserting user");
  }
});

async function start() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();