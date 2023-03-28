const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Importing the Routes
const noteRoutes = require('./routes/noteRoutes');

// URL of the database hosted on MongoDB Atlas
const dbURL =
  "mongodb+srv://chiragchakraborty48:cPdnN7h4O5PNvNxY@cluster0.qger13l.mongodb.net/?retryWrites=true&w=majority";

// Connecting to the database and running the server on port 3000
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on Port 3000");
    })
  )
  .catch((err) => console.log(err));

// Setting the View Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public")); // Setting the Static Folder
app.use(express.urlencoded({ extended: true })); // For Parsing URLs

// Notes Routes
app.use(noteRoutes);

// Error Page
app.use((req, res) => {
  res.status(404).render("error", { title: "Error" });
});
