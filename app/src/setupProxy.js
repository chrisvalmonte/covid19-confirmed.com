const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      target: 'http://corona.lmao.ninja',
    }),
  );
  app.use(
    '/covid-news',
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: {
        '^/covid-news': '',
      },
      target: 'http://newsapi.org/v2',
    }),
  );
};
