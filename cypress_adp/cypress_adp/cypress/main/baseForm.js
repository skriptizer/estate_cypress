require('cypress-xpath');
const XPATH = require('./locators/baseLocatorChildren/XPATH');

class BaseForm {
  #pageName;

  #pageLocator;

  constructor(pageLocator, pageName) {
    this.#pageLocator = pageLocator;
    this.#pageName = pageName;
  }

  getUniqueElement() {
    return this.#pageLocator instanceof XPATH
      ? cy.xpath(this.#pageLocator.value).first()
      : cy.get(this.#pageLocator.value).first();
  }

  pageIsVisible() {
    return this.getUniqueElement().isVisible();
  }

  waitPageIsExisting() {
    return cy.waitIsExisting(this.#pageLocator.value);
  }

  pageIsDisplayed() {
    cy.logger(`[inf] ▶ check ${this.#pageName} is displayed:`);
    return this.waitPageIsExisting().then((isExisting) => {
      const notDisplayedLog = `[inf]   ${this.#pageName} is not displayed`;
      if (isExisting) {
        return this.pageIsVisible().then((isVisible) => {
          cy.logger(isVisible ? `[inf]   ${this.#pageName} is displayed` : notDisplayedLog);
          return cy.wrap(isVisible);
        });
      }

      cy.logger(notDisplayedLog);
      return cy.wrap(isExisting);
    });
  }

  pageIsEnabled() {
    cy.logger(`[inf] ▶ check ${this.#pageName} is enabled:`);
    return this.getUniqueElement().waitIsEnabled().then((isEnabled) => {
      cy.logger(
        isEnabled
          ? `[inf]   ${this.#pageName} is enabled`
          : `[inf]   ${this.#pageName} is not enabled`,
      );
      return cy.wrap(isEnabled);
    });
  }
}

module.exports = BaseForm;
