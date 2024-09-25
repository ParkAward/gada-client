import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: any) => {
    app.use(
        createProxyMiddleware('', {
            target: process.env.REACT_APP_PROXY_URL,
            changeOrigin: true,
        }),
    );
};
