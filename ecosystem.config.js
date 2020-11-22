module.exports = {
  apps: [
    {
      name: 'VALIU-API',
      script: 'node',
      args: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'VALIU-CONSUMER',
      script: 'node',
      args: 'dist/consumers/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
