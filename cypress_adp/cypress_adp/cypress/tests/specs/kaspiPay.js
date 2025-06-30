const NodeEvents = require('../../support/nodeEvents');
const DataUtils = require('../../main/utils/data/dataUtils');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.kaspiPay = () => {
  it('Pay with Kaspi:', { scrollBehavior: false }, () => {
    cy.getLocalStorage('installmentPayment').then((installmentPayment) => {
      if (installmentPayment === 'true') {
        cy.logger('[inf] ▶ payment skipped (installment)');
      } else {
        cy.getLocalStorage('paymentCode')
          .then((paymentCode) => cy.getLocalStorage('sumToPay')
            .then((sumToPay) => NodeEvents.payWithKaspi({ sumToPay, paymentCode })))
          .then(async (responses) => {
            responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
            const convertedResponse = await DataUtils.XMLToJSON(responses.pop().data);
            cy.wrap(convertedResponse.comment.pop())
              .should('contain', JSONLoader.testData.responsePaid);
          });
        cy.logger('[inf] ▶ paid (one-time payment)');
      }
    });
    cy.clearLocalStorage();
  });
};
