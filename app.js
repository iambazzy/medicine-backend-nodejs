require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const helmet = require('helmet');
// const rateLimit = require("express-rate-limit");
const { checkRequest } = require('./middleware/global.middleware');
const cors = require('cors');
const app = express();

// const loginLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000, 
//   max: 5, 
//   message: 'Requests are coming in a very huge amount, Restricting access.'
// });

// const cors_options = {
//   origin: 'http://betterlifekashmir.com',
//   optionsSuccessStatus: 200
// }
// app.use(loginLimuter);
app.use(cors());
app.use(helmet());
app.use(checkRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNECT TO DB
require('./db.init')();

// ROUTES
const userRoute = require('./routes/user.route');
app.use('/user', userRoute);

const medicineRoute = require('./routes/medicine.route');
app.use('/medicine', medicineRoute);

const adminRoute = require('./routes/admin.route');
app.use('/administrator', adminRoute);

const cartRoute = require('./routes/cart.route');
app.use('/cart', cartRoute);

const ordersRoute = require('./routes/orders.route');
app.use('/orders', ordersRoute);

app.listen(process.env.PORT, () => {
  console.log(chalk.green.bold(`[${process.env.NODE_ENV}] Server started successfully on port - localhost:${process.env.PORT}`));
});