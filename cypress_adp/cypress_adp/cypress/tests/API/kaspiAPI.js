const path = require('path');
const moment = require('moment');
const authAPI = require('./authAPI');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class KaspiAPI extends BaseAPI {
  #API;

  #options;

  constructor(options = {
    baseURL: '' || process.env.GATEWAY_URL,
  }) {
    super(options);
    this.#options = options;
  }

  async setToken() {
    const response = await authAPI.auth({ APIName: 'Kaspi API' });
    this.#options.headers = {};
    this.#options.headers.Authorization = `Bearer ${response.data.data.access_token}`;
    this.#API = new KaspiAPI(this.#options);
    return response;
  }

  async pay(paymentInfo) {
    const params = {
      command: 'pay',
      txn_id: Randomizer.getRandomString(false, false, true, false, false, 18, 18),
      txn_date: moment().format().slice(0, 19).replace(/-|T|:/g, ''),
      account: paymentInfo.paymentCode,
      sum: paymentInfo.sumToPay,
    };

    return this.#API.get(JSONLoader.APIEndpoints.kaspi.pay, params);
  }
}

module.exports = new KaspiAPI();
