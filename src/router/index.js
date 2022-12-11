const adminRouter = require('./admin');
const apiRouter = require('./api');
const initWebRoute = (app) => {
  app.use('/', adminRouter);
  app.use('/admin', adminRouter);
  app.use('/api', apiRouter);
};

module.exports = initWebRoute;
