/* eslint-disable no-plusplus */
// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const os = require('os');
const cluster = require('cluster');
const DB = require('./config/database');
const indexRouter = require('./routes/index');

require('dotenv').config();

const clusterWorkerSize = os.cpus().length;

const PORT = process.env.PORT || 3000;

function settingApp(app) {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // catch 404 and forward to error handler
  // app.use((req, res, next) => {
  //   next(createError(404));
  // });

  // error handler
  // app.use((err, req, res) => {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};

  //   // render the error page
  //   res.status(err.status || 500);
  //   res.render('error');
  // });

  app.use('/', indexRouter);
}

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log('Worker', worker.id, ' has exitted.');
    });
  } else {
    const app = express();

    settingApp(app);

    app.listen(PORT, () => {
      DB.connect();
      console.log(
        // eslint-disable-next-line comma-dangle
        `Express server listening on port ${PORT} and worker ${process.pid}`
      );
    });
  }
} else {
  const app = express();

  settingApp(app);

  app.listen(PORT, () => {
    // DB.connect();
    DB.connect();
    console.log(
      // eslint-disable-next-line comma-dangle
      `Express server listening on port ${PORT} with the single worker ${process.pid}`
    );
  });
}
