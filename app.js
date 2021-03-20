require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNECT TO DB
require('./db.init')();

// ROUTES
const userRoute = require('./routes/user.route');
app.use('/user', userRoute);

const medicineRoute = require('./routes/medicine.route');
app.use('/medicine', medicineRoute);


app.listen(process.env.PORT, () => {
  console.log(chalk.green.bold(`Server started successfully on port - localhost:${process.env.PORT}`));
});