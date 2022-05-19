// DEV 和 FAT公用即可
module.exports = {
  DEV: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '/api': '/' },
    },
  },
  FAT: {
    '/api': {
      target: 'http://canyon-v2.fat-1.qa.nt.ctripcorp.com',
      changeOrigin: true,
      pathRewrite: { '/api': '/' },
    },
  },
  PROD: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '/api': '/' },
    },
  },
}
