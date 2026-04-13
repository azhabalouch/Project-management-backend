require('dotenv').config();
require('./config/firebase');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const userAuth = require('./routes/auth')
const userTask = require('./routes/user');

const app = express();

app.use(helmet());

app.use(cors({
    origin: ['http://localhost:5173', 'https://azhabalouch.github.io'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use('/auth', userAuth);
app.use('/user', userTask);

const port = 3000;

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});