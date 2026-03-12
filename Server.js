const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reportRoutes = require("./Router");
const volunteerRoutes = require("./Volunteer");
const orphanageRoutes = require("./Orphanage");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ✅ MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Hack")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api", reportRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/orphanages", orphanageRoutes);

// ✅ Server Start
const PORT = 5000;
app.listen(PORT, () => 
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);