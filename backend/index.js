const express = require('express');
const { connectToDatabase } = require('./db/mongoose');
const cors = require('cors');
const auth = require('./routes/auth');
const recipeRoutes = require('./routes/recipeRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectToDatabase();

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Use the auth routes with the `/api` prefix
app.use('/api', auth);

// Use the recipe routes without any prefix
app.use('/home', recipeRoutes);

app.listen(8002, () => {
    console.log("Server is running on port 8002");
});
