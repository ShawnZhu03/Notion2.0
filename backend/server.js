//server
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

require('dotenv').config();
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