const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/covid',
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: {
        '^/covid': '',
      },
      target: 'http://corona.lmao.ninja',
    }),
  );
  app.use(
    '/news',
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: {
        '^/news': '',
      },
      target: 'http://newsapi.org/v2',
    }),
  );
};
