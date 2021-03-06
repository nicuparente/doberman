'use strict';

//Load ENV variables
require('dotenv').config({path: `${__dirname}/../.env`});

//Load libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//Load Middleware
app.use(morgan('dev'));
app.use(cors());

//Load Routes
app.use(require('../route/goal.js'));
app.all('/api/*', (req, res, next) => res.sendStatus(404));

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log(`Server is listening in PORT 3000`);
        resolve();
      });
      return;
    }
    reject(new Error('Server is already running'));
  });
};