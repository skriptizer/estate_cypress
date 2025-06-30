const path = require('path');
const authAPI = require('./authAPI');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class DictionaryAPI extends BaseAPI {
  #API;

  #options;

  constructor(options = {
    baseURL: '' || process.env.GATEWAY_URL,
  }) {
    super(options);
    this.#options = options;
  }

  async setToken() {
    const response = await authAPI.auth({ APIName: 'Dictionary API' });
    this.#options.headers = {};
    this.#options.headers.Authorization = `Bearer ${response.data.data.access_token}`;
    this.#API = new DictionaryAPI(this.#options);
    return response;
  }

  async toggleServer() {
    const params = {
      setting: JSONLoader.configData.servers,
    };

    return this.#API.post(JSONLoader.APIEndpoints.dictionary.servers, params);
  }

  async toggleVerification(options = { fromConfig: true, value: true }) {
    const params = {
      value: Number(options.fromConfig ? JSONLoader.configData.verification : options.value),
    };

    return this.#API.patch(JSONLoader.APIEndpoints.dictionary.verifyBool, params);
  }

  async getVerifyBool() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.keyVerifyBool);
  }

  async fetchAllTestClients() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.testClients);
  }

  async fetchAllTestCars() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.testCars);
  }

  async getESBDValue() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.ESBD);
  }
}

module.exports = new DictionaryAPI();
