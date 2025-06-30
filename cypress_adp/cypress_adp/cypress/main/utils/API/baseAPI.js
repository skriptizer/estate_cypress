const axios = require('axios');

class BaseAPI {
  #baseURL;

  #logString;

  #timeout;

  #headers;

  #logBaseURL;

  #axiosInstance;

  constructor(options) {
    this.#baseURL = options.baseURL;
    this.#logString = options.logString;
    this.#timeout = options.timeout;
    this.#headers = options.headers;
    this.#axiosInstance = this.createInstance();
  }

  createInstance() {
    if (this.#logString) this.#logBaseURL = `${this.#logString} ${this.#baseURL}`;
    return axios.create({
      baseURL: this.#baseURL,
      timeout: this.#timeout,
      headers: this.#headers,
    });
  }

  async get(endpoint, params) {
    const logs = [`[req] ▶ get ${JSON.stringify(params || {})} from ${endpoint}:`];
    if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
    try {
      const response = await this.#axiosInstance.get(`/${endpoint}`, { params });
      logs.push(`[res]   status code: ${response.status}`);
      return { data: response.data, status: response.status, logs };
    } catch (error) {
      logs.push(`[res]   status code: ${error.response.status}`);
      logs.push(`[res]   body: ${JSON.stringify(error.response.data)}`);
      return { data: error.response.data, status: error.response.status, logs };
    }
  }

  async post(endpoint, params) {
    const logs = [`[req] ▶ post ${JSON.stringify(params || {})} to ${endpoint}:`];
    if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
    try {
      const response = await this.#axiosInstance.post(`/${endpoint}`, params);
      logs.push(`[res]   status code: ${response.status}`);
      return { data: response.data, status: response.status, logs };
    } catch (error) {
      logs.push(`[res]   status code: ${error.response.status}`);
      logs.push(`[res]   body: ${JSON.stringify(error.response.data)}`);
      return { data: error.response.data, status: error.response.status, logs };
    }
  }

  async patch(endpoint, params) {
    const logs = [`[req] ▶ patch ${JSON.stringify(params || {})} to ${endpoint}:`];
    if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
    try {
      const response = await this.#axiosInstance.patch(`/${endpoint}`, params);
      logs.push(`[res]   status code: ${response.status}`);
      return { data: response.data, status: response.status, logs };
    } catch (error) {
      logs.push(`[res]   status code: ${error.response.status}`);
      logs.push(`[res]   body: ${JSON.stringify(error.response.data)}`);
      return { data: error.response.data, status: error.response.status, logs };
    }
  }
}

module.exports = BaseAPI;
