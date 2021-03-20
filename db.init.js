require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');

const dbOptions = {
  dbName: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI, dbOptions)
    .then(() => console.log(chalk.bold.green('Database connected!')))
    .catch(err => console.log(chalk.redBright(err)));

  mongoose.connection.on('connected', () => console.log(chalk.green.bold('Mongoose connected!')));

  mongoose.connection.on('error', err => console.log(chalk.redBright(err)));

  mongoose.connection.on('disconnected', () => console.log(chalk.redBright('Mongoose connection is disconnected')));

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(chalk.redBright('Mongoose connection disconnected'));
      process.exit(0);
    });
  });
};
