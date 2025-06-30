const mysql = require('mysql2/promise');

class BaseDB {
  #host;

  #user;

  #port;

  #password;

  #database;

  #connection;

  constructor(host, user, password, database, port) {
    this.#host = host;
    this.#user = user;
    this.#password = password;
    this.#database = database;
    this.#port = port;
  }

  async createConnection() {
    const logs = [`[inf] ▶ connect to ${this.#database} database`];
    this.#connection = await mysql.createConnection({
      host: this.#host,
      user: this.#user,
      password: this.#password,
      database: this.#database,
      port: this.#port,
    });
    return { logs };
  }

  async closeConnection() {
    const logs = [`[inf] ▶ close connection to ${this.#database} database`];
    await this.#connection.end();
    return { logs };
  }

  async sqlQuery(query, values) {
    const [rows] = await this.#connection.query(query, values);
    return rows;
  }

  async sqlSelect(
    tableName,
    target = '*',
    conditions = '',
    values = [],
    options = { hasLogger: true },
  ) {
    const logs = [];
    if (options.hasLogger) logs.push(`[inf] ▶ select ${target} from ${tableName} table`);
    const query = `SELECT ${target} FROM ${tableName} ${conditions};`;
    const rows = await this.sqlQuery(query, values);
    return { rows, logs };
  }
}

module.exports = BaseDB;
