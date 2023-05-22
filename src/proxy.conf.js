const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "https://api-us.faceplusplus.com",
    secure: true,
    changeOrigin: true,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
