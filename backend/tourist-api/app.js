const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`Hello from Middleware 1`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
});

//Routes mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
