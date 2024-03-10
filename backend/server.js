//server
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.get("/", (req, res) => res.send("Express on Vercel"));

const folderRoutes = require("./routes/folderRoutes.js")
const noteRoutes = require("./routes/noteRoutes.js")
const userRoutes = require("./routes/usersRoutes.js")

require('dotenv').config();


const port = 5001;

app.use(cors());
app.use(express.json());



app.use('/folders', folderRoutes);
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);
app.use('/uploads', express.static(__dirname +'/uploads'));




const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("mongoose databse connection established successfully");
})



app.listen(port, () => {
  console.log(`server is running on: ${port}`);
})

console.log("hello");

module.exports = app;