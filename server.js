const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// use errorHandler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightMagenta.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('process.on');
  console.log(`Error: ${err.message}`.red);
  // Close server & exit processs
  server.close(() => process.exit(1));
});
