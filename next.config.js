module.exports = {
  webpack: (config, { isServer }) => {
    config.node = {
      //net: 'empty',
      global: true,
  __filename: true,
  __dirname: true,
    }
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        crypto: false,
          fs: false,
          net: false,
          querystring: false,
          stream: false,
          tls: false,
          zlib: false
      }
  }
    return config
  }
};
