require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const helmet = require('helmet');
const app = express();

app.use(helmet());
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

app.listen(process.env.PORT, () => {
  console.log(chalk.green.bold(`Server started successfully on port - localhost:${process.env.PORT}`));
});