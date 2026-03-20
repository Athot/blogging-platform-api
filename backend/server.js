const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db.js");
const postRoutes = require("./routes/postRoutes.js");

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRoutes);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in PORT ${PORT}`);
});
