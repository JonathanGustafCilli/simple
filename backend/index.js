const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend" });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});