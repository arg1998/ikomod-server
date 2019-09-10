let config = {
  PORT: process.env.PORT,
  JWT_USER_SECRET: process.env.JWT_USER_SECRET,
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET
};

if (process.env.DEV) {
  config = require('./private');
}

module.exports = config;
