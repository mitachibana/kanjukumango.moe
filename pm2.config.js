module.exports = {
  apps: [
    {
      name: 'kanjukumango.moe',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};