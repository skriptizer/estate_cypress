require('@testing-library/cypress/add-commands');
const JSONLoader = require('../main/utils/data/JSONLoader');

Cypress.Commands.add('open', (url, options) => {
  if (JSONLoader.configData.parallel) {
    const title = Cypress.spec.name.replace(/\.js$/, '');
    cy.logger(`${title} test log:`, title);
  }

  cy.logger(`[inf] ▶ open base URL: ${url === '/' ? Cypress.config().baseUrl : url}`);
  cy.visit(url, options);
});

Cypress.Commands.add('logger', (step, title) => {
  cy.task('log', { step, title }).then((timeStamp) => {
    if (!title) cy.log(`${timeStamp} ${step}`);
  });
});

Cypress.Commands.add('isEnabled', { prevSubject: true }, (subject) => !subject.prop('disabled'));

Cypress.Commands.add('isVisible', { prevSubject: true }, (subject) => Cypress.dom.isVisible(subject));

Cypress.Commands.add('isExisting', { prevSubject: false }, (subject) => cy.document().then((document) => {
  const convertLocator = (locator) => {
    const nodeList = [];
    const result = document.evaluate(locator, document, null, XPathResult.ANY_TYPE, null);
    let node; // eslint-disable-next-line no-cond-assign
    while (node = result.iterateNext()) {
      nodeList.push(node);
    }

    return nodeList;
  };

  return new Cypress.Promise((resolve) => {
    Cypress.$(() => {
      resolve(Cypress.$(document).find(convertLocator(subject)).length > 0);
    });
  });
}));

Cypress.Commands.add('waitIsEnabled', { prevSubject: true }, (subject) => cy.waitUntil(() => new Cypress.Promise((resolve) => {
  Cypress.$(() => {
    resolve(Cypress.$(subject).prop('disabled') === false);
  });
}), {
  timeout: Cypress.config('defaultCommandTimeout'),
  interval: 500,
}));

Cypress.Commands.add('waitIsExisting', { prevSubject: false }, (subject) => cy.document().then((document) => {
  const convertLocator = (locator) => {
    const nodeList = [];
    const result = document.evaluate(locator, document, null, XPathResult.ANY_TYPE, null);
    let node; // eslint-disable-next-line no-cond-assign
    while (node = result.iterateNext()) {
      nodeList.push(node);
    }

    return nodeList;
  };

  return cy.waitUntil(() => new Cypress.Promise((resolve) => {
    Cypress.$(() => {
      resolve(Cypress.$(document).find(convertLocator(subject)).length > 0);
    });
  }), {
    timeout: Cypress.config('defaultCommandTimeout'),
    interval: 500,
  });
}));

Cypress.Commands.add('waitIsNotEnabled', { prevSubject: true }, (subject) => cy.waitUntil(() => new Cypress.Promise((resolve) => {
  Cypress.$(() => {
    resolve(Cypress.$(subject).prop('disabled') === true);
  });
}), {
  timeout: Cypress.config('defaultCommandTimeout'),
  interval: 500,
}));

Cypress.Commands.add('waitIsNotExisting', { prevSubject: false }, (subject) => cy.document().then((document) => {
  const convertLocator = (locator) => {
    const nodeList = [];
    const result = document.evaluate(locator, document, null, XPathResult.ANY_TYPE, null);
    let node; // eslint-disable-next-line no-cond-assign
    while (node = result.iterateNext()) {
      nodeList.push(node);
    }

    return nodeList;
  };

  return cy.waitUntil(() => new Cypress.Promise((resolve) => {
    Cypress.$(() => {
      resolve(Cypress.$(document).find(convertLocator(subject)).length === 0);
    });
  }), {
    timeout: Cypress.config('defaultCommandTimeout'),
    interval: 500,
  });
}));

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of null (reading 'focus')")
    || err.message.includes("Cannot read properties of null (reading 'postMessage')")
    || err.message.includes('ResizeObserver loop')) return false;
  return true;
});
