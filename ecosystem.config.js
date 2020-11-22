module.exports = {
  apps: [
    {
      name: 'VALIU-API',
      script: './node_modules/.bin/ts-node',
      args: 'src/index.ts',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'VALIU-CONSUMER',
      script: './node_modules/.bin/ts-node',
      args: 'src/consumers/index.ts',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
