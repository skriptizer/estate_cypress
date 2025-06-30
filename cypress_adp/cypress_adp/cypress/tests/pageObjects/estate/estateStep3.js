const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../../main/elements/baseElementChildren/button');
const RadioButton = require('../../../main/elements/baseElementChildren/radioButton');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');

class EstateStep3 extends BaseForm {
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

  #juridicalNameTextbox;

  #activityKindTextbox;

  #economicSectorTextbox;

  #individualEntrepreneurNameTextbox;

  #juridicalPersonRadioButton;

  #individualEntrepreneurRadioButton;

  constructor() {
    super(
      new XPATH('//input[@id="form_item_iin"]'),
      'Estate Page Step 3',
    );

    this.#iinTextbox = new Button(
      new XPATH('//input[@id="form_item_iin"]'),
      'Iin textbox',
    );

    this.#searchClientButton = new Button(
      new XPATH('//input[@id="form_item_iin"]/..//button/span[contains(text(), "Поиск")]'),
      'Search client button',
    );

    this.#lastNameTextbox = new Button(
      new XPATH('//input[@id="form_item_last_name"]'),
      'Last name textbox',
    );

    this.#firstNameTextbox = new Button(
      new XPATH('//input[@id="form_item_first_name"]'),
      'First name textbox',
    );

    this.#middleNameTextbox = new Button(
      new XPATH('//input[@id="form_item_middle_name"]'),
      'Middle name textbox',
    );

    this.#dateOfBirthTextbox = new Button(
      new XPATH('//input[@id="form_item_born"]'),
      'Date of birth textbox',
    );

    this.#sexRadioButton = new Button(
      new XPATH('//div[@id="form_item_sex_id"]/descendant::span[contains(@class, "ant-radio-checked")]/following-sibling::span'),
      'Sex radio button',
    );

    this.#documentTypeDropdown = new Button(
      new XPATH('//input[@id="form_item_document_type_id"]/../following-sibling::span[contains(@class, "ant-select-selection-item")]'),
      'Document type dropdown',
    );

    this.#documentNumberTextbox = new Button(
      new XPATH('//input[@id="form_item_document_number"]'),
      'Document number textbox',
    );

    this.#documentIssuedDateTextbox = new Button(
      new XPATH('//input[@id="form_item_document_gived_date"]'),
      'Document issued date textbox',
    );

    this.#documentIssuedByDropdown = new Button(
      new XPATH('//input[@id="form_item_document_gived_by"]/../following-sibling::span[contains(@class, "ant-select-selection-item")]'),
      'Document issued by dropdown',
    );

    this.#addressTextbox = new Button(
      new XPATH('//input[@id="form_item_juridical_address"]'),
      'Address textbox',
    );

    this.#emailTextbox = new Button(
      new XPATH('//input[@id="form_item_email"]'),
      'Email textbox',
    );

    this.#phoneNumberTextbox = new Button(
      new XPATH('//input[@id="form_item_phone"]'),
      'Phone number textbox',
    );

    this.#saveButton = new Button(
      new XPATH('//div[contains(@class, "ant-form-item-control-input")]//button/span[contains(text(), "Сохранить")]'),
      'Save button',
    );

    this.#nextButton = new Button(
      new XPATH('//div[contains(@class, "ant-space-item")]//button/span[contains(text(), "Далее")]'),
      'Next button',
    );

    this.#juridicalNameTextbox = new Textbox(
      new XPATH('//input[@id="form_item_juridical_person_name"]'),
      'Juridical name textbox',
    );

    this.#activityKindTextbox = new Textbox(
      new XPATH('//input[@id="form_item_activity_kind_id"]/../following-sibling::span'),
      'Activity kind textbox',
    );

    this.#economicSectorTextbox = new Textbox(
      new XPATH('//input[@id="form_item_economics_sector_id"]/../following-sibling::span'),
      'Economic sector textbox',
    );

    this.#individualEntrepreneurNameTextbox = new Textbox(new XPATH('//input[@id="form_item_ind_ent_name"]'), 'IP name textbox');

    this.#juridicalPersonRadioButton = new RadioButton(
      new XPATH('//div[@id="form_item_client_form_id"]//span[contains(normalize-space(.), "Юридическое лицо")]/preceding-sibling::span'),
      'Juridical person radio button',
    );

    this.#individualEntrepreneurRadioButton = new RadioButton(
      new XPATH('//div[@id="form_item_client_form_id"]//span[contains(normalize-space(.), "Инд. предприниматель")]/preceding-sibling::span'),
      'Individual entrepreneur radio button',
    );
  }

  inputDataHolderIIN(iin) {
    this.#iinTextbox.inputData(iin);
  }

  clickSearchClientButton() {
    this.#searchClientButton.clickElement();
  }

  clickIndividualEntrepreneurRadioButton() {
    this.#individualEntrepreneurRadioButton.clickElement();
  }

  clickJuridicalPersonRadioButton() {
    this.#juridicalPersonRadioButton.clickElement();
  }

  getJuridicalNameElement() {
    return this.#juridicalNameTextbox.getElement();
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

  getIndividualEntrepreneurNameElement() {
    return this.#individualEntrepreneurNameTextbox.getElement();
  }

  getActivityKindElement() {
    return this.#activityKindTextbox.getElement();
  }

  getEconomicSectorElement() {
    return this.#economicSectorTextbox.getElement();
  }

  getDocumentIssuedDateElement() {
    return this.#documentIssuedDateTextbox.getElement();
  }

  getOrSetDocumentIssuedByElement(holderDocumentGivedBy) {
    return this.#documentIssuedByDropdown.getText().then((value) => {
      if (value === holderDocumentGivedBy) {
        return cy.wrap(value);
      }

      this.#documentIssuedByDropdown.clickElement();
      new Button(
        new XPATH(`//div[contains(@class, 'ant-select-item-option-content') and text()='${holderDocumentGivedBy}']`),
        'document issued by dropdown element',
      ).clickElement();
      return this.getOrSetDocumentIssuedByElement(holderDocumentGivedBy);
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
}

module.exports = new EstateStep3();
