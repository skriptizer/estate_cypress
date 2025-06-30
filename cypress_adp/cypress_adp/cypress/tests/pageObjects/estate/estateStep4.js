const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class EstateStep4 extends BaseForm {
  #iinTextbox;

  #nextButton;

  #searchClientButton;

  #lastNameTextbox;

  #firstNameTextbox;

  #middleNameTextbox;

  #dateOfBirthTextbox;

  #sexRadioButton;

  #documentTypeDropdown;

  #documentNumberTextbox;

  #documentIssuedDateTextbox;

  #documentIssuedByDropdown;

  #addressTextbox;

  #emailTextbox;

  #phoneNumberTextbox;

  #saveButton;

  #addInsuredButton;

  #juridicalNameTextbox;

  #activityKindTextbox;

  #economicSectorTextbox;

  #ipNameTextbox;

  #juridicalPersonRadioButton;

  constructor() {
    super(
      new XPATH(
        '//div[contains(@class, "mb-6")]/button/span[contains(text(), "Добавить")]',
      ),
      'Estate Page Step 4',
    );

    this.#iinTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_iin"]'),
      'Iin textbox',
    );

    this.#searchClientButton = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_iin"]/..//button/span[contains(text(), "Поиск")]'),
      'Search client button',
    );

    this.#lastNameTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_last_name"]'),
      'Last name textbox',
    );

    this.#firstNameTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_first_name"]'),
      'First name textbox',
    );

    this.#middleNameTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_middle_name"]'),
      'Middle name textbox',
    );

    this.#dateOfBirthTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_born"]'),
      'Date of birth textbox',
    );

    this.#sexRadioButton = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//div[@id="form_item_sex_id"]/descendant::span[contains(@class, "ant-radio-checked")]/following-sibling::span'),
      'Sex radio button',
    );

    this.#documentTypeDropdown = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_document_type_id"]/../following-sibling::span[contains(@class, "ant-select-selection-item")]'),
      'Document type dropdown',
    );

    this.#documentNumberTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_document_number"]'),
      'Document number textbox',
    );

    this.#documentIssuedDateTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_document_gived_date"]'),
      'Document issued date textbox',
    );

    this.#documentIssuedByDropdown = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_document_gived_by"]/../following-sibling::span[contains(@class, "ant-select-selection-item")]'),
      'Document issued by dropdown',
    );

    this.#addressTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_juridical_address"]'),
      'Address textbox',
    );

    this.#emailTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_email"]'),
      'Email textbox',
    );

    this.#phoneNumberTextbox = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_phone"]'),
      'Phone number textbox',
    );

    this.#saveButton = new Button(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//div[contains(@class, "ant-form-item-control-input")]//button/span[contains(text(), "Сохранить")]'),
      'Save button',
    );

    this.#nextButton = new Button(
      new XPATH('//div[contains(@class, "ant-space-item")]//button/span[contains(text(), "Далее")]'),
      'Next button',
    );

    this.#addInsuredButton = new Button(
      new XPATH('//div[contains(@class, "mb-6")]/button/span[contains(text(), "Добавить")]'),
      'Add insured button',
    );

    this.#juridicalNameTextbox = new Textbox(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_juridical_person_name"]'),
      'Juridical name textbox',
    );

    this.#activityKindTextbox = new Textbox(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_activity_kind_id"]/../following-sibling::span'),
      'Activity kind textbox',
    );

    this.#economicSectorTextbox = new Textbox(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_economics_sector_id"]/../following-sibling::span'),
      'Economic sector textbox',
    );

    this.#ipNameTextbox = new Textbox(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//input[@id="form_item_ind_ent_name"]'),
      'IP name textbox',
    );

    this.#juridicalPersonRadioButton = new RadioButton(
      new XPATH('//div[@id="rc-tabs-0-panel-1"]//div[@id="form_item_client_form_id"]//span[contains(normalize-space(.), "Юридическое лицо")]/preceding-sibling::span'),
      'Juridical person radio button',
    );
  }

  inputDataInsuredIIN(iin) {
    this.#iinTextbox.inputData(iin);
  }

  clickSearchClientButton() {
    this.#searchClientButton.clickElement();
  }

  getLastNameElement() {
    return this.#lastNameTextbox.getElement();
  }

  getFirstNameElement() {
    return this.#firstNameTextbox.getElement();
  }

  getOrSetMiddleNameElement(middleName) {
    if (this.#middleNameTextbox.getText !== middleName) {
      this.#middleNameTextbox.clearData();
      this.#middleNameTextbox.inputData(middleName);
    }

    return this.#middleNameTextbox.getElement();
  }

  getDateOfBirthElement() {
    return this.#dateOfBirthTextbox.getElement();
  }

  getSexText() {
    return this.#sexRadioButton.getText();
  }

  getDocumentTypeText() {
    this.#documentTypeDropdown.scrollElementToView();
    return this.#documentTypeDropdown.getText();
  }

  getDocumentNumberElement() {
    return this.#documentNumberTextbox.getElement();
  }

  getDocumentIssuedDateElement() {
    return this.#documentIssuedDateTextbox.getElement();
  }

  getOrSetDocumentIssuedByElement(insuredDocumentGivedBy) {
    return this.#documentIssuedByDropdown.getText().then((value) => {
      if (value === insuredDocumentGivedBy) {
        return cy.wrap(value);
      }

      this.#documentIssuedByDropdown.clickElement();
      new Button(new XPATH(`//div[contains(@class, 'ant-select-item-option-content') and text()='${insuredDocumentGivedBy}']`), 'document issued by dropdown element').clickElement();
      return this.getOrSetDocumentIssuedByElement(insuredDocumentGivedBy);
    });
  }

  getOrSetAddressElement(address) {
    if (this.#addressTextbox.getText !== address) {
      this.#addressTextbox.clearData();
      this.#addressTextbox.inputData(address);
    }

    return this.#addressTextbox.getElement();
  }

  getOrSetEmailElement(email) {
    if (this.#emailTextbox.getText !== email) {
      this.#emailTextbox.clearData();
      this.#emailTextbox.inputData(email);
    }

    return this.#emailTextbox.getElement();
  }

  inputPhoneNumber(phoneNumber) {
    this.#phoneNumberTextbox.clearData();
    this.#phoneNumberTextbox.inputData(phoneNumber);
  }

  clickSaveButton() {
    this.#saveButton.clickElement();
  }

  clickNextButton() {
    this.#nextButton.clickElement();
  }

  clickAddInsuredButton() {
    this.#addInsuredButton.scrollElementToView();
    this.#addInsuredButton.clickElement();
  }

  clickJuridicalPersonRadioButton() {
    this.#juridicalPersonRadioButton.clickElement();
  }

  getJuridicalNameElement() {
    return this.#juridicalNameTextbox.getElement();
  }

  getIpNameElement() {
    return this.#ipNameTextbox.getElement();
  }

  getActivityKindElement() {
    return this.#activityKindTextbox.getElement();
  }

  getEconomicSectorElement() {
    return this.#economicSectorTextbox.getElement();
  }
}

module.exports = new EstateStep4();
