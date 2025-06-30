require('cypress-xpath');
const Randomizer = require('../utils/random/randomizer');
const XPATH = require('../locators/baseLocatorChildren/XPATH');

class BaseElement {
  #elementName;

  #elementLocator;

  constructor(elementLocator, elementName) {
    this.#elementLocator = elementLocator;
    this.#elementName = elementName;
  }

  getElement(locator) {
    let elementLocator = locator;
    if (!elementLocator) elementLocator = this.#elementLocator;
    return elementLocator instanceof XPATH
      ? cy.xpath(elementLocator.value).first()
      : cy.get(elementLocator.value).first();
  }

  getElements() {
    return this.#elementLocator instanceof XPATH
      ? cy.xpath(this.#elementLocator.value)
      : cy.get(this.#elementLocator.value);
  }

  clickElement() {
    cy.logger(`[inf] ▶ click ${this.#elementName}`);
    return this.getElement().click();
  }

  focusOnElement() {
    cy.logger(`[inf] ▶ focus on ${this.#elementName}`);
    return this.getElement().focus();
  }

  forceClickElement() {
    cy.logger(`[inf] ▶ force click ${this.#elementName}`);
    return this.getElement().click({ force: true });
  }

  doubleClickElement() {
    cy.logger(`[inf] ▶ double click ${this.#elementName}`);
    this.getElement().dblclick();
  }

  multipleClickElement(count) {
    cy.logger(`[inf] ▶ click ${this.#elementName} ${count} times`);
    this.getElement().clicks(count);
  }

  clickElementFromList(index) {
    cy.logger(`[inf] ▶ click element from ${this.#elementName}`);
    this.getElements()[index].click();
  }

  getText() {
    cy.logger(`[inf] ▶ get ${this.#elementName} text:`);
    this.getElement().then(($el) => cy.logger(`[inf]   text contains: "${$el.text()}"`));
    return this.getElement().then(($el) => $el.text());
  }

  getValue() {
    cy.logger(`[inf] ▶ get ${this.#elementName} value:`);
    this.getElement().then(($el) => cy.logger(`[inf]   value is: "${$el.val()}"`));
    return this.getElement().then(($el) => $el.val());
  }

  getElementsListText({ propertyName }) {
    return this.getElements().then(($el) => Cypress._.map($el, propertyName));
  }

  getAttributeValue({ attrName }) {
    cy.logger(`[inf] ▶ get ${this.#elementName} attribute "${attrName}" value:`);
    return this.getElement().invoke('attr', attrName).then((value) => {
      cy.logger(`[inf]   attribute value contains: "${value}"`);
      return cy.wrap(value);
    });
  }

  scrollElementToView() {
    cy.logger(`[inf] ▶ scroll to ${this.#elementName}`);
    this.getElement().scrollIntoView({ offset: { top: -150, left: 0 } });
  }

  clearData() {
    cy.logger(`[inf] ▶ clear ${this.#elementName}`);
    this.getElement().clear();
  }

  inputData(data, options = { useCypressRealEvents: false }) {
    cy.logger(`[inf] ▶ input ${this.#elementName}`);
    if (options.useCypressRealEvents) {
      this.getElement().click();
      cy.realType(data);
    } else {
      this.getElement().type(data);
    }
  }

  forceInputData(data) {
    cy.logger(`[inf] ▶ force input ${this.#elementName}`);
    this.getElement().type(data, { force: true });
  }

  fillInputField(data) {
    cy.logger(`[inf] ▶ fill input data into ${this.#elementName}`);
    this.getElement().fill(data, { overwrite: false, prepend: true });
  }

  enterData(data) {
    cy.logger(`[inf] ▶ input ${this.#elementName} and submit`);
    this.getElement().type(`${data}{enter}`);
  }

  uploadFile(path) {
    cy.logger(`[inf] ▶ upload file with ${this.#elementName}`);
    this.getElement().selectFile(path, { force: true });
  }

  elementIsVisible() {
    return this.getElement().isVisible();
  }

  elementIsExisting() {
    return cy.isExisting(this.#elementLocator.value);
  }

  waitElementIsExisting() {
    return cy.waitIsExisting(this.#elementLocator.value);
  }

  waitElementIsNotExisting() {
    return cy.waitIsNotExisting(this.#elementLocator.value);
  }

  elementIsDisplayed() {
    cy.logger(`[inf] ▶ check ${this.#elementName} is displayed:`);
    return this.elementIsExisting().then((isExisting) => {
      const notDisplayedLog = `[inf]   ${this.#elementName} is not displayed`;
      if (isExisting) {
        return this.elementIsVisible().then((isVisible) => {
          cy.logger(isVisible ? `[inf]   ${this.#elementName} is displayed` : notDisplayedLog);
          return cy.wrap(isVisible);
        });
      }

      cy.logger(notDisplayedLog);
      return cy.wrap(isExisting);
    });
  }

  waitElementIsDisplayed() {
    cy.logger(`[inf] ▶ wait ${this.#elementName} is displayed:`);
    return this.waitElementIsExisting().then((isExisting) => {
      const notDisplayedLog = `[inf]   ${this.#elementName} is not displayed`;
      if (isExisting) {
        return this.elementIsVisible().then((isVisible) => {
          cy.logger(isVisible ? `[inf]   ${this.#elementName} is displayed` : notDisplayedLog);
          return cy.wrap(isVisible);
        });
      }

      cy.logger(notDisplayedLog);
      return cy.wrap(isExisting);
    });
  }

  waitElementIsNotDisplayed() {
    cy.logger(`[inf] ▶ wait ${this.#elementName} is not displayed:`);
    return this.waitElementIsNotExisting().then((isExisting) => {
      const displayedLog = `[inf]   ${this.#elementName} is displayed`;
      if (!isExisting) {
        return this.elementIsVisible().then((isVisible) => {
          cy.logger(!isVisible ? `[inf]   ${this.#elementName} is not displayed` : displayedLog);
          return cy.wrap(isVisible);
        });
      }

      cy.logger(displayedLog);
      return cy.wrap(isExisting);
    });
  }

  elementIsEnabled() {
    cy.logger(`[inf] ▶ check ${this.#elementName} is enabled:`);
    return this.getElement().isEnabled().then((isEnabled) => {
      cy.logger(
        isEnabled
          ? `[inf]   ${this.#elementName} is enabled`
          : `[inf]   ${this.#elementName} is not enabled`,
      );
      return cy.wrap(isEnabled);
    });
  }

  waitElementIsEnabled() {
    cy.logger(`[inf] ▶ wait ${this.#elementName} is enabled:`);
    return this.getElement().waitIsEnabled().then((isEnabled) => {
      cy.logger(
        isEnabled
          ? `[inf]   ${this.#elementName} is enabled`
          : `[inf]   ${this.#elementName} is not enabled`,
      );
      return cy.wrap(isEnabled);
    });
  }

  waitElementIsNotEnabled() {
    cy.logger(`[inf] ▶ wait ${this.#elementName} is not enabled:`);
    return this.getElement().waitIsNotEnabled().then((isEnabled) => {
      cy.logger(
        !isEnabled
          ? `[inf]   ${this.#elementName} is not enabled`
          : `[inf]   ${this.#elementName} is enabled`,
      );
      return cy.wrap(isEnabled);
    });
  }

  /**
   * requires one mandatory argument: dropdownElement.
   * options contain optional parameters:
   * list of values to choose from,
   * count of elements to choose,
   * boolean toggler for typing and pressing Enter key
   * and exceptions elements sequence:
   * @param {BaseElement} dropdownElement
   * @param {Object} options
   * @param {Promise} options.valuesListPromise
   * @param {int} options.count
   * @param {boolean} options.typeAndEnter
   * @param {BaseElement[]} options.exceptionElementsList
   */
  chooseRandomElementsFromDropdownByText(dropdownElement, options = {}) {
    let valuesList = options.valuesList ?? null;
    const count = options.count ?? 1;
    const typeAndEnter = options.typeAndEnter ?? false;
    const exceptionElementsList = options.exceptionElementsList ?? [];

    this.getElement(this.#elementLocator).click();

    const exceptionsTextList = [];
    const selectedElements = [];

    if (exceptionElementsList.length !== 0) {
      exceptionElementsList.forEach((element) => this.getElement(element.#elementLocator)
        .then(($el) => exceptionsTextList.push($el.text())));
    }

    const processValuesList = (listOfValues) => {
      for (let counter = 0; counter < count; counter += 1) {
        const randomElementText = Randomizer.getRandomElementByText(
          listOfValues,
          exceptionsTextList,
        );
        exceptionsTextList.push(randomElementText);
        selectedElements.push(randomElementText);
        dropdownElement.chooseElementFromDropdown(randomElementText, typeAndEnter);
      }
    };

    if (!valuesList) {
      valuesList = dropdownElement.getElementsListText({ propertyName: 'innerText' }).then((elements) => {
        valuesList = elements;
        processValuesList(valuesList);
      });
    } else {
      processValuesList(valuesList);
    }

    return cy.wrap(selectedElements);
  }

  // requires two mandatory arguments:
  // inputElementType - is type of clickable element (checkbox/radio),
  // parentOfLabelTag - is a tagname of an element on the upper node that nesting input`s label text
  clickRandomRadiobuttonsOrCheckboxesByText(
    { inputElementType, parentOfLabelTag, randomCount = true },
    ...exceptionsElements
  ) {
    this.getElementsListText({ propertyName: 'innerText' }).then((elementsTextList) => {
      let count = elementsTextList.length;
      if (randomCount) count = Randomizer.getRandomInteger(elementsTextList.length, 1);
      const exceptionsTextList = [];
      if (exceptionsElements.length !== 0) {
        exceptionsElements.forEach((element) => this.getElement(element.#elementLocator)
          .then(($el) => exceptionsTextList.push($el.text())));
      }

      for (let counter = 0; counter < count; counter += 1) {
        cy.logger(`[inf] ▶ get random element from ${this.#elementName}`);
        const randomElementText = Randomizer.getRandomElementByText(
          elementsTextList,
          exceptionsTextList,
        );
        exceptionsTextList.push(randomElementText);
        cy.logger(`[inf] ▶ click ${randomElementText}`);
        cy.contains(parentOfLabelTag, randomElementText)
          .find(`input[type=${inputElementType}]`)
          .click({ force: true });
      }
    });
  }

  openCalendarAndFlipMonths(rightArrowElement, monthIncrement) {
    cy.logger(`[inf] ▶ click ${this.#elementName}`);
    this.getElement().clicks(4);
    for (let i = 0; i < monthIncrement; i += 1) {
      cy.logger(`[inf] ▶ click ${rightArrowElement.#elementName}`);
      this.getElement(rightArrowElement.#elementLocator).click({ force: true });
    }
  }

  // lazy method for new calendar component
  // which includes 2 months per page instead of 1 like others
  openCalendarAndFlipMonthsMST(rightArrowElement, startMonthDifference) {
    this.getElement().clicks(3);
    if (startMonthDifference > 1) {
      for (let i = 1; i < startMonthDifference; i += 1) {
        cy.logger(`[inf] ▶ click ${rightArrowElement.#elementName}`);
        this.getElement(rightArrowElement.#elementLocator).click();
      }
    }
  }

  // lazy method for new calendar component that doesn't open calendar at the start
  flipMonthsMST(rightArrowElement, startMonthDifference, finishMonthDifference) {
    if (startMonthDifference < finishMonthDifference) {
      const startToFinishMonthDifference = finishMonthDifference - startMonthDifference;
      for (let i = 0; i < startToFinishMonthDifference; i += 1) {
        cy.logger(`[inf] ▶ click ${rightArrowElement.#elementName}`);
        this.getElement(rightArrowElement.#elementLocator).click();
      }
    }
  }

  clickArrowButtonRandomNumberOfTimes({ direction, numberOfElements }) {
    this.elementIsVisible();
    const directionLowerCase = direction.toLowerCase();
    const numberOfClicksOnArrowButton = Randomizer.getRandomInteger(numberOfElements - 1);
    cy.logger(`[inf] ▶ direction: ${directionLowerCase}, numberOfClicks: ${numberOfClicksOnArrowButton}`);
    for (let i = numberOfClicksOnArrowButton; i > 0; i -= 1) {
      cy.logger(`[inf] ▶ press ${directionLowerCase} arrow button`);
      cy.realPress(`{${directionLowerCase}arrow}`);
    }
    cy.logger('[inf] ▶ press Enter button');
    cy.realPress('Enter');
  }

  createListOfElements(dropdownElement) {
    const elements = [];
    this.getElement(dropdownElement.#elementLocator).click();

    return this.getElement().then((element) => {
      elements.push(element.text());

      return this.iterateOverList(elements);
    });
  }

  iterateOverList(elements) {
    this.getElement();
    cy.realPress('{downarrow}');

    return this.getElement().then((element) => {
      if (element.text() === elements[0]) {
        cy.logger(`Number of countries is ${elements.length}`);

        return cy.wrap(elements);
      }
      elements.push(element.text());

      return this.iterateOverList(elements);
    });
  }

  chooseElementFromDropdown(text, typeAndEnter) {
    if (typeAndEnter) {
      cy.logger(`[inf] ▶ type and enter ${text}`);
      this.enterData(text);
      cy.realPress('{esc}');
    } else {
      cy.logger(`[inf] ▶ click ${text}`);
      this.getElements().contains(new RegExp(`${text}`, 'g')).click({ force: true });
    }
  }
}

module.exports = BaseElement;
