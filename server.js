require('dotenv').config();
const express = require("express");
const helmet = require('helmet');
const userProfileRouter = require('./routes/user/profile')
const userLogin = require('./routes/login')
const cors = require('cors');
const app = express();

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/user/profile', userProfileRouter);
app.use('/login', userLogin);

const port = 3000;

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});