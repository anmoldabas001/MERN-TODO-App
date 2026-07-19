const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Task Schema
const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
  })
);

// Add Task
app.post("/add", async (req, res) => {
  try {
    const task = new Task({
      text: req.body.text,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});