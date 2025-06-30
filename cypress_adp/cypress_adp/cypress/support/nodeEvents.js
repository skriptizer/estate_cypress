class NodeEvents {
  static payWithKaspi(paymentInfo) {
    return cy.task('payWithKaspi', paymentInfo).then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      return cy.wrap(responses);
    });
  }

  static resetClient(client) {
    return cy.task('resetClient', client).then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      return cy.wrap(responses);
    });
  }

  static toggleVerification(options = { fromConfig: true, value: true }) {
    return cy.task('toggleVerification', options).then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      return cy.wrap(responses);
    });
  }

  static getVerifyBool() {
    return cy.task('getVerifyBool').then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      const setting = JSON.parse(responses.pop().data.setting);
      return cy.wrap(setting.value);
    });
  }

  static getESBDValue() {
    return cy.task('getESBDValue').then((responses) => {
      responses.forEach((response) => response.logs.forEach((log) => cy.logger(log)));
      const setting = JSON.parse(responses.pop().data.setting);
      return cy.wrap(setting.value);
    });
  }
}

module.exports = NodeEvents;
