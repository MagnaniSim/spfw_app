module.exports = {
  "development": {
    "username": process.env.DATABASE_USER_DEBUG,
    "password": process.env.DATABASE_PASSWORD_DEBUG,
    "database": process.env.DATABASE_NAME_DEBUG,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DATABASE_USER_PROD,
    "password": process.env.DATABASE_PASSWORD_PROD,
    "database": process.env.DATABASE_NAME_PROD,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  }
}
