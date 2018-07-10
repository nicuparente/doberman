'use strict';

//Load ENV variables
require('dotenv').config({path: `${__dirname}/../.env`});

//Load libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

//Load Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(require('./error-middleware.js'));

//Load Routes
app.use(require('../route/goal-router.js'));
app.all('/api/*', (req, res, next) => res.sendStatus(404));

const server = module.exports = {};
const PORT = process.env.PORT || 3000;
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(PORT, () => {
        server.isOn = true;
        console.log(`Server is listening in PORT ${PORT}`);
        resolve();
      });
      return;
    }
    reject(new Error('Server is already running'));
  });
};