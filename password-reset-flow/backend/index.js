require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const bodyParser =  require("body-parser");

const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

