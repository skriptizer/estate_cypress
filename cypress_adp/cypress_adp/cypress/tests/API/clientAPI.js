const path = require('path');
const authAPI = require('./authAPI');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class ClientAPI extends BaseAPI {
  #API;

  #options;

  constructor(options = {
    baseURL: '' || process.env.GATEWAY_URL,
  }) {
    super(options);
    this.#options = options;
  }

  async setToken() {
    const response = await authAPI.auth({ APIName: 'Client API' });
    this.#options.headers = {};
    this.#options.headers.Authorization = `Bearer ${response.data.data.access_token}`;
    this.#API = new ClientAPI(this.#options);
    return response;
  }

  async getClient(client) {
    const params = {
      iin: client.iin,
      natural_person_bool: client.natural_person_bool,
      resident_bool: client.resident_bool,
    };

    return this.#API.get(JSONLoader.APIEndpoints.client.getClient, params);
  }

  async setClient(client) {
    return this.#API.post(JSONLoader.APIEndpoints.client.setClient, client);
  }
}

module.exports = new ClientAPI();
