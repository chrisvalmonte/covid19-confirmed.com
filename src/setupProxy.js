const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      pathRewrite: {
        '^/api': '',
      },
      target: 'http://corona.lmao.ninja',
    }),
  );
  app.use(
    '/covid-news',
    createProxyMiddleware({
      pathRewrite: {
        '^/covid-news': '',
      },
      target: 'http://newsapi.org/v2',
    }),
  );
};
