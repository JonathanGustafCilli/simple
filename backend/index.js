const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => { res.json({ ok: true });});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend" });
});

let tasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Connect React to API", done: true },
];

app.get("/api/tasks", (req, res) => { res.json(tasks);});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required" });
  
  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});