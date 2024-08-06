const express = require('express');
const { connectToDatabase } = require('./db/mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

//app.use('/login', login);

app.listen(8002, () => {
    console.log("Server is running on port 8002");
});
