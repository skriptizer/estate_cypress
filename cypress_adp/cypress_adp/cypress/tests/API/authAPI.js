const path = require('path');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class AuthAPI extends BaseAPI {
  #login;

  #password;

  constructor(options = {
    baseURL: '' || process.env.GATEWAY_URL,
    logString: '[inf] ▶ set base API URL:',
  }) {
    super(options);
    this.#login = '' || process.env.AUTH_LOGIN;
    this.#password = '' || process.env.AUTH_PASSWORD;
  }

  async auth({ user, APIName }) {
    const params = user
      ? { login: user.login, password: user.password }
      : { login: this.#login, password: this.#password };

    const response = await this.post(JSONLoader.APIEndpoints.auth.login, params);
    response.logs.unshift(`[inf]   login in ${APIName} as ${params.login}:`);
    return response;
  }
}

module.exports = new AuthAPI();
