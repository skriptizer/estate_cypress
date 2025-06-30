const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const Label = require('../../../main/elements/baseElementChildren/label');
const Switch = require('../../../main/elements/baseElementChildren/switch');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const Checkbox = require('../../../main/elements/baseElementChildren/checkbox');

class EstateStep5 extends BaseForm {
  #iinTextbox;

  #naturalPersonSwitch;

  #searchClientButton;

  #lossBeneficiaryDropdown;

  #lossBeneficiaryValues;

  #extraInfoTextbox;

  #saveButton;

  #issuePolicyButton;

  #kaspiBillCheckbox;

  #issueButton;

  #policyNumberLabel;

  #paymentCodeLabel;

  constructor() {
    super(
      new XPATH('//h1[contains(text(), "Выгодоприобретатель по повреждению")]'),
      'Estate Page Step 5',
    );

    this.#iinTextbox = new Button(
      new XPATH('//input[@id="form_item_iin"]'),
      'Iin textbox',
    );

    this.#naturalPersonSwitch = new Switch(
      new XPATH('//button[@id="form_item_natural_person_bool"]'),
      'Natural person switch',
    );

    this.#searchClientButton = new Button(
      new XPATH('//input[@id="form_item_iin"]/..//button/span[contains(text(), "Поиск")]'),
      'Search client button',
    );

    this.#lossBeneficiaryDropdown = new Button(
      new XPATH('//input[@id="form_item_id"]'),
      'Loss beneficiary dropdown',
    );

    this.#lossBeneficiaryValues = new Button(
      new XPATH('//div[@id="form_item_id_list"]/following::div/child::div/child::div/child::div'),
      'Loss beneficiary values',
    );

    this.#extraInfoTextbox = new Textbox(
      new XPATH('//textarea[@id="form_item_additional_info"]'),
      'Extra info textbox',
    );

    this.#saveButton = new Button(
      new XPATH('//button/span[contains(text(), "Сохранить")]'),
      'Save button',
    );

    this.#issuePolicyButton = new Button(
      new XPATH('//button/span[contains(text(), "Выписать полис")]'),
      'Issue policy button',
    );

    this.#kaspiBillCheckbox = new Checkbox(
      new XPATH('//span[text()=" отправить счет на оплату на Kaspi "]/..//input[@type="checkbox"]'),
      'Kaspi bill checkbox',
    );

    this.#issueButton = new Checkbox(
      new XPATH('//div[contains(@class, "ant-popconfirm-buttons")]/button/span[contains(text(), "Выписать")]'),
      'Issue button',
    );

    this.#policyNumberLabel = new Button(
      new XPATH('//strong[contains(normalize-space(.), "Номер полиса")]'),
      'policy number label',
    );

    this.#paymentCodeLabel = new Label(
      new XPATH('//strong[text()="Код для оплаты через Kaspi: "]//following::code'),
      'payment code label',
    );
  }

  inputExtraInfoTextbox() {
    this.#extraInfoTextbox.inputData(JSONLoader.testData.extraInfo);
  }

  inputDataBeneficiaryIIN(iin) {
    this.#iinTextbox.inputData(iin);
  }

  clickSearchClientButton() {
    this.#searchClientButton.clickElement();
  }

  clickNaturalPersonSwitch() {
    this.#naturalPersonSwitch.clickElement();
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

  clickIssuePolicyButton() {
    this.#issuePolicyButton.waitElementIsDisplayed();
    this.#issuePolicyButton.clickElement();
  }

  clickKaspiBillCheckbox() {
    this.#kaspiBillCheckbox.waitElementIsDisplayed();
    this.#kaspiBillCheckbox.clickElement();
  }

  clickIssueButton() {
    this.#issueButton.waitElementIsDisplayed();
    this.#issueButton.clickElement();
  }

  clickRandomLossBeneficiaryDropdown(randomText) {
    this.#lossBeneficiaryDropdown.clickElement();
    this.#lossBeneficiaryValues.chooseElementFromDropdown(
      randomText,
      { typeAndEnter: true },
    );
  }

  getPolicyNumberText() {
    return this.#policyNumberLabel.getText().then((text) => text.slice(14));
  }

  getPaymentCode() {
    return this.#paymentCodeLabel.getText();
  }
}

module.exports = new EstateStep5();
