const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const http = require("http");
const multer = require('multer');
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());
// Define a route to serve files from a specific folder
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set your desired upload folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-file", upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log(file);
  if (file) {
    res.status(200).json("File uploaded successfully");
  }
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
});

const server = http.createServer(app);

server.listen(port, console.log(`Server is listening on port ${port}`));

