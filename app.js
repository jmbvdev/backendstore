const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path= require("path")
// Routers
const { usersRouter } = require('./routers/users.routes');
const { repairsRouter } = require('./routers/repairs.routes');

const { globalErrorHandler } = require('./controllers/error.controller');
const { viewsRouter } = require('./routers/views.routes');

const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Enable static assets
app.use(express.static("public"))

//Add security helmet
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

//Enable incoming from-data
app.use(express.urlencoded({extended:true}))

// Set put a template engine
app.set("view engine", "pug")

app.set("views", path.join(__dirname,"views"))
// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

// Endpoints
app.use('/', viewsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
