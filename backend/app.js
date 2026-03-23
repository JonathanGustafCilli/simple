require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    console.error("GET /api/tasks failed:", error);
    res.status(500).json({
      error: "Failed to fetch tasks",
      details: error.message,
    });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const task = await prisma.task.create({
      data: {
        text: text.trim(),
        done: false,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

module.exports = app;