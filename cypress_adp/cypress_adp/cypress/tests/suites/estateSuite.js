const { login } = require('../specs/login');
const { kaspiPay } = require('../specs/kaspiPay');
const { userPathEstate } = require('../specs/userPathEstate');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const clients = DataUtils.filterClients(JSONLoader.testClients);
const { beneficiary, holder, insured } = DataUtils.createRandomClientsStructures(clients);
const { loginManager, passwordManager } = Cypress.env().manager_credentials;

describe('Estate test suite:', () => {
  login(loginManager, passwordManager);
  userPathEstate(holder, insured, beneficiary);
  kaspiPay();
});
