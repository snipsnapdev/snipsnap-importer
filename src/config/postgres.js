module.exports = {
  development: {
    username: process.env.POSTGRESQL_USERNAME,
    port: process.env.POSTGRESQL_PORT,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    host: process.env.POSTGRESQL_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRESQL_USERNAME,
    port: process.env.POSTGRESQL_PORT,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    host: process.env.POSTGRESQL_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRESQL_USERNAME,
    port: process.env.POSTGRESQL_PORT,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    host: process.env.POSTGRESQL_HOST,
    dialect: 'postgres',
  },
};
