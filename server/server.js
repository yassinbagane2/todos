const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Todo = require("./models/TodoSchema");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION, GET, POST, PUT, PATCH, DELETE "
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  if (!todos) {
    return res.status(400).json("No todos");
  }
  return res.status(200).json(todos);
});
app.post("/add-todo", async (req, res, next) => {
  const { text, priority } = req.body;
  try {
    if (!text || !priority) {
      throw new Error("Task and priority are required");
    }
    const newTask = new Todo({
      text: text,
      priority: priority,
    });
    const result = await newTask.save();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.put("/update-progress/:id", async (req, res, next) => {
  const taskId = req.params.id;
  const progress = req.body.progress;
  console.log(progress);
  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      taskId,
      { status: progress },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return res
      .status(200)
      .json({ message: "Progress updated successfully", updatedTask });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/delete-todo/:id", async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Todo.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new Error("Task not found");
    }

    return res
      .status(200)
      .json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    `mongodb+srv://yassinbagane:52544318@cluster1.muuzvzg.mongodb.net/todo`
  )
  .then(() => {
    app.listen(8080);
    console.log("connected");
  })
  .catch(err => {
    console.log(err);
  });
