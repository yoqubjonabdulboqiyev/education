const express = require('express');
const fileUploader = require('express-fileupload');
const config = require('../config');
const routes = require('./router');
const errorHandler = require('./middleware/error-middleware');
const { connect } = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/api", routes)

app.use(errorHandler)

const start = async () => {

  await connect('mongodb://127.0.0.1:27017/Education')
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
}

start();