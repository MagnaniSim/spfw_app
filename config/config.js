module.exports = {
  "development": {
    "username": "spfwapp-dbuser-debug",
    "password": "sPFw@pPd3b",
    "database": "spfwapp-db-debug",
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
    "username": "spfwapp-dbuser-prod",
    "password": "sPFw@pPpr0d",
    "database": "spfwapp-db-prod",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  }
}
