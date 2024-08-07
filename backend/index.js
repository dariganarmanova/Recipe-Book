const express = require('express');
const { connectToDatabase } = require('./db/mongoose');
const cors = require('cors');
const auth = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

connectToDatabase();
//app.use('/login', login);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api', auth);


app.listen(8002, () => {
    console.log("Server is running on port 8002");
});
