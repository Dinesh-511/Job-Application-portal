import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import logger from './middleware/logger.js';

const app = express();
const port = 3000;

// Middlewares
app.use(logger);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Data (in-memory)
const applications = [];

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/apply", upload.single("resume"), (req, res) => {app.post("/apply", upload.single("resume"), (req, res) => {
  const { name, email } = req.body;
  const resumePath = req.file.path;

  applications.push({ name, email, resume: resumePath });
  res.render("success", { name });
});

app.get("/admin/applications", (req, res) => {
  res.render("applications", { applications });
});
app.post("/apply", upload.single("resume"), (req, res) => {
  const { name, email } = req.body;
  const resumePath = req.file.path;

  applications.push({ name, email, resume: resumePath });
  res.render("success", { name });
});

app.get("/admin/applications", (req, res) => {
  res.render("applications", { applications });
});

  const { name, email } = req.body;
  const resumePath = req.file.path;

  applications.push({ name, email, resume: resumePath });
  res.render("success", { name });
});

app.get("/admin/applications", (req, res) => {
  res.render("applications", { applications });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
