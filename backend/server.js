const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Enviroment vars
require('dotenv').config();

// port on
const app = express();
const port = process.env.PORT || 5000;

// cross origin set and pass of the body requests in json format
app.use(cors());
app.use(express.json());


// connect with MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

// eval the avaibility of the connection
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Use of files with the routes for http operations respectivily
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


// server runnig in define port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});