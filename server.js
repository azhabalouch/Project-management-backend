require('dotenv').config();
require('./config/firebase');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middleware/errorMiddleware');

// Route Imports
const taskRoutes = require('./routes/task.routes');
const projectRoutes = require('./routes/project.routes');
const todoRoutes = require('./routes/todo.routes');
const eventRoutes = require('./routes/event.routes');
const authRoutes = require('./routes/auth');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(cookieParser());
app.use(express.json());

// API Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/events', eventRoutes);

// Catch unhandled routes
app.all('/*/', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler must be the last middleware
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});