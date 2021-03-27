require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');

const dbOptions = {}

if (process.env.NODE_ENV === 'production') {
  dbOptions['dbName'] = process.env.PROD_DB_NAME;
  dbOptions['useNewUrlParser'] = true;
  dbOptions['useUnifiedTopology'] = true;
  dbOptions['useFindAndModify'] = false;
  dbOptions['useCreateIndex'] = true;
  // user: process.env.DB_USER,
  // pass: process.env.DB_PASS,
} else {
  dbOptions['dbName'] = process.env.DEV_DB_NAME;
  dbOptions['useNewUrlParser'] = true;
  dbOptions['useUnifiedTopology'] = true;
  dbOptions['useFindAndModify'] = false;
  dbOptions['useCreateIndex'] = true;
  // user: process.env.DB_USER,
  // pass: process.env.DB_PASS,
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
