const mainPage = require('../pageObjects/mainPage');
const loginPage = require('../pageObjects/loginPage');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.login = (login, password) => {
  it('Login into ADP:', { scrollBehavior: false }, () => {
    cy.intercept(JSONLoader.testData.requestsForIntercept.login).as('login');
    cy.clearAllCookies();
    cy.open('/');
    loginPage.pageIsDisplayed().should('be.true');
    loginPage.fillLoginAndPassword(login, password);
    loginPage.clickSubmitButton();
    cy.wait('@login').its('response.statusCode').should('be.equal', 200);
    mainPage.pageIsDisplayed().should('be.true');
  });
};
