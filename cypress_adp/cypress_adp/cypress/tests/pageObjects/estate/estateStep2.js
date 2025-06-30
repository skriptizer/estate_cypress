const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const JSONLoader = require('../../../main/utils/data/JSONLoader');

class EstateStep2 extends BaseForm {
  #typeOfObjectsDropdown;

  #regionsDropdown;

  #addressTextbox;

  #saveObjectButton;

  #apartamentNumberTextbox;

  #selectedTypeOfObjectLable;

  #formItemAddressListDropdown;

  #saveAllObjectsButton;

  #nextButton;

  constructor() {
    super(
      new XPATH('//strong[contains(text(), "Год стройки: ")]'),
      'Estate Page Step 2',
    );

    this.#typeOfObjectsDropdown = new Button(
      new XPATH('//input[@id="form_item_category_id"]'),
      'Type of objects dropdown',
    );

    this.#regionsDropdown = new Button(
      new XPATH('//input[@id="form_item_region_id"]'),
      'Regions dropdown',
    );

    this.#addressTextbox = new Textbox(
      new XPATH('//textarea[@id="form_item_address"]'),
      'Address text box',
    );

    this.#apartamentNumberTextbox = new Textbox(
      new XPATH('//input[@id="form_item_apartment"]'),
      'Apartament number text box',
    );

    this.#selectedTypeOfObjectLable = new Textbox(
      new XPATH('//input[@id="form_item_category_id"]/../following-sibling::span'),
      'Selected type of object lable',
    );

    this.#saveObjectButton = new Button(
      new XPATH('//div[contains(@class, "ant-modal-footer")]//button/span[contains(text(), "Сохранить")]'),
      'Save object button',
    );

    this.#formItemAddressListDropdown = new Button(
      new XPATH('//div[@id="form_item_address_list"]'),
      'Address list dropdown',
    );

    this.#saveAllObjectsButton = new Button(
      new XPATH('//div[contains(@class, "ant-space-item")]//button/span[contains(text(), "Сохранить")]'),
      'Save all objects button',
    );

    this.#nextButton = new Button(
      new XPATH('//div[contains(@class, "ant-space-item")]//button/span[contains(text(), "Далее")]'),
      'Next button',
    );
  }

  chooseRandomRegionValue(numberOfElements) {
    this.#regionsDropdown.clickElement();
    this.#regionsDropdown.clickArrowButtonRandomNumberOfTimes({ direction: 'down', numberOfElements });
  }

  chooseRandomTypeOfObjectValue(numberOfElements) {
    this.#typeOfObjectsDropdown.clickElement();
    this.#typeOfObjectsDropdown.clickArrowButtonRandomNumberOfTimes({ direction: 'down', numberOfElements });
  }

  inputAddressData() {
    const data = JSONLoader.testData.estateAddress;
    this.#addressTextbox.enterData(data);
    this.#formItemAddressListDropdown.clickArrowButtonRandomNumberOfTimes({ direction: 'down', numberOfElements: 5 });
    cy.realPress('Tab');
  }

  inputApartamentNumberData() {
    const data = JSONLoader.testData.apartamentNumber;
    this.#selectedTypeOfObjectLable.getText().then((text) => {
      if (text !== 'Квартира') {
        return;
      }

      this.#apartamentNumberTextbox.inputData(data);
    });
  }

  clickSaveObjectButton() {
    this.#saveObjectButton.clickElement();
  }

  clickSaveAllObjectsButton() {
    this.#saveAllObjectsButton.clickElement();
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  // eslint-disable-next-line class-methods-use-this
  clickObjectByNumber(numberOfObject) {
    const currentObject = new Button(
      new XPATH(
        `//strong[contains(text(), "№")]/following-sibling::span[contains(text(), "${numberOfObject}")]`,
      ),
      'object button',
    );
    currentObject.clickElement();
  }
}

module.exports = new EstateStep2();
