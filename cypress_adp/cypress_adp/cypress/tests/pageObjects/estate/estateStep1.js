const BaseForm = require('../../../main/baseForm');
const XPATH = require('../../../main/locators/baseLocatorChildren/XPATH');
const Label = require('../../../main/elements/baseElementChildren/label');
const Button = require('../../../main/elements/baseElementChildren/button');
const CheckBox = require('../../../main/elements/baseElementChildren/checkbox');
const Textbox = require('../../../main/elements/baseElementChildren/textbox');
const Switch = require('../../../main/elements/baseElementChildren/switch');
const Randomizer = require('../../../main/utils/random/randomizer');
const JSONLoader = require('../../../main/utils/data/JSONLoader');
const TimeUtils = require('../../../main/utils/time/timeUtils');
const StrUtils = require('../../../main/utils/str/strUtils');

class EstateStep1 extends BaseForm {
  #agentDropdown;

  #franchiseDamageValues;

  #franchiseDamageDropdown;

  #agentCommissionDropdown;

  #estateTypeDropdown;

  #insuranceSumTypeDropdown;

  #reliableObjectSwitch;

  #awayOfBazaarSwitch;

  #notEmptySwitch;

  #noInsuredEventSwitch;

  #selectedAgentLabel;

  #estateTypeValues;

  #agentCommissionValues;

  #agentValues;

  #insuranceSumTypeValues;

  #calendarRightArrowButton;

  #dateBeginButton;

  #fireFightingEquipmentsCheckboxes;

  #selectedEstateType;

  #securityServicesCheckboxes;

  #addObjectButton;

  #insuranceObjectTypeValues;

  #insuranceObjectTypeDropdown;

  #nextButton;

  #premiumLabel;

  constructor() {
    super(
      new XPATH('//lable[contains(@title, "Тип объекта")]'),
      'Estate Page Step 1',
    );

    this.#agentDropdown = new Button(
      new XPATH('//input[@id="form_item_agent_id_1c"]'),
      'Agent dropdown',
    );

    this.#franchiseDamageDropdown = new Button(
      new XPATH('//input[@id="form_item_franchise_id"]'),
      'Franchise damage dropdown',
    );

    this.#agentCommissionDropdown = new Button(
      new XPATH('//input[@id="form_item_agent_commission_id"]'),
      'Agent commission dropdown',
    );

    this.#estateTypeDropdown = new Button(
      new XPATH('//input[@id="form_item_estate_type_id"]'),
      'Estate type dropdown',
    );

    this.#insuranceSumTypeDropdown = new Button(
      new XPATH('//input[@id="form_item_type_insurance_sum"]'),
      'Incurance sum type dropdown',
    );

    this.#reliableObjectSwitch = new Switch(
      new XPATH('//button[@id="form_item_reliable_object"]'),
      'Reliable object switch',
    );

    this.#awayOfBazaarSwitch = new Switch(
      new XPATH('//button[@id="form_item_away_of_bazaar"]'),
      'Away of bazaar switch',
    );

    this.#notEmptySwitch = new Switch(
      new XPATH('//button[@id="form_item_not_empty"]'),
      'Not empty switch',
    );

    this.#noInsuredEventSwitch = new Switch(
      new XPATH('//button[@id="form_item_no_ic"]'),
      'No insured event switch',
    );

    this.#selectedAgentLabel = new Label(
      new XPATH('//input[@id="form_item_agent_id_1c"]/../following-sibling::span'),
      'Selected agent label',
    );

    this.#estateTypeValues = new Button(
      new XPATH('//div[@id="form_item_estate_type_id_list"]/following-sibling::div//div[contains(@class, "ant-select-item-option-content")]'),
      'Estate type values',
    );

    this.#agentCommissionValues = new Button(
      new XPATH('//div[@id="form_item_agent_commission_id_list"]/following-sibling::div//div[contains(@class, "ant-select-item-option-content")]'),
      'Agent commission values',
    );

    this.#franchiseDamageValues = new Button(
      new XPATH('//div[@id="form_item_franchise_id_list"]/following-sibling::div//div[contains(@class, "ant-select-item-option-content")]'),
      'Franchise damage values',
    );

    this.#agentValues = new Button(
      new XPATH('//div[@id="form_item_agent_id_1c_list"]/following-sibling::div//div[contains(@class, "ant-select-item-option-content")]'),
      'Agent values',
    );

    this.#insuranceSumTypeValues = new Button(
      new XPATH('//div[@id="form_item_type_insurance_sum_list"]/following-sibling::div//div[contains(@class, "ant-select-item-option-content")]'),
      'Insurance sum type values',
    );

    this.#dateBeginButton = new Button(
      new XPATH('//input[@id="form_item_date_begin"]'),
      'Date begin button',
    );

    this.#calendarRightArrowButton = new Button(
      new XPATH('//button[contains(@class, "ant-picker-header-next-btn")]'),
      'Right calendar arrow button',
    );

    this.#fireFightingEquipmentsCheckboxes = new CheckBox(
      new XPATH('//div[@id="form_item_fire_fighting_equipments"]//label'),
      'Fire fighting equipments checkBoxes',
    );

    this.#selectedEstateType = new Label(
      new XPATH('//input[@id="form_item_estate_type_id"]/../following-sibling::span'),
      'Selected estate type',
    );

    this.#securityServicesCheckboxes = new CheckBox(
      new XPATH('//div[@id="form_item_security_services"]//label'),
      'Security services checkboxes',
    );

    this.#addObjectButton = new Button(
      new XPATH('//div[contains(@class, "sm2:block")]/button//span[contains(text(), "Добавить объект")]'),
      'Add object button',
    );

    this.#insuranceObjectTypeValues = new Button(
      new XPATH('//div[@id="rc_select_9_list"]/following-sibling::div//div[contains(@class, "ant-select-item-option-content")]'),
      'Insurance object type values',
    );

    this.#insuranceObjectTypeDropdown = new Button(
      new XPATH('//input[@id"rc_select_9"]'),
      'Insurance object type dropdown',
    );

    this.#nextButton = new Button(
      new XPATH('//div[contains(@class, "xxxl:w-50%")]/button'),
      'Next button',
    );

    this.#premiumLabel = new Label(
      new XPATH('//div[contains(@class, "flex flex-wrap gap-2")]/div[contains(text(), "Премия")]/span'),
      'Premium lable',
    );
  }

  chooseAgent() {
    this.#agentDropdown.chooseRandomElementsFromDropdownByText(this.#agentValues);
  }

  chooseRandomFranchiseDamageValue() {
    this.#franchiseDamageDropdown
      .chooseRandomElementsFromDropdownByText(this.#franchiseDamageValues);
  }

  chooseRandomAgentComissionValue() {
    this.#selectedAgentLabel.getText().then((text) => {
      if (text === 'Не предусмотрен') {
        return;
      }

      this.#agentCommissionDropdown
        .chooseRandomElementsFromDropdownByText(this.#agentCommissionValues);
    });
  }

  chooseRandomEstateTypeValue() {
    this.#estateTypeDropdown.chooseRandomElementsFromDropdownByText(this.#estateTypeValues);
    return this.#selectedEstateType.getText().then((text) => {
      if (text === 'Жилое имущество') {
        return 1;
      }

      return 2;
    });
  }

  chooseRandomInsuranceSumTypeValue() {
    this.#insuranceSumTypeDropdown
      .chooseRandomElementsFromDropdownByText(this.#insuranceSumTypeValues);
  }

  choosePolicyStartDate() {
    const { startDate, startMonthDifference } = Randomizer
      .getRandomDatesIntervalFromTomorrow(
        ...JSONLoader.testData.timeIncrementForEstateInstallmentPaymentFirstDate,
      );
    const policyStartDateButton = new Button(
      new XPATH(`//td[@title="${TimeUtils.reformatDateFromDMYToYMD(startDate)}"]`),
      'policy start date button',
    );
    this.#dateBeginButton
      .openCalendarAndFlipMonths(this.#calendarRightArrowButton, startMonthDifference);
    policyStartDateButton.clickElement();
  }

  turnOnReliableObjectSwitch() {
    this.#reliableObjectSwitch.clickElement();
  }

  turnOnAwayOfBazaarSwitch() {
    this.#awayOfBazaarSwitch.clickElement();
  }

  turnOnNotEmptySwitch() {
    this.#notEmptySwitch.clickElement();
  }

  turnOnNoInsuredEventSwitch() {
    this.#noInsuredEventSwitch.clickElement();
  }

  chooseRandomFireFightingEquipmentsCheckboxes() {
    return this.#selectedEstateType.getText().then((text) => {
      if (text === 'Жилое имущество') {
        return null;
      }

      return this.#fireFightingEquipmentsCheckboxes.clickRandomRadiobuttonsOrCheckboxesByText({
        inputElementType: 'checkbox',
        parentOfLabelTag: 'label',
        randomCount: true,
      });
    });
  }

  chooseRandomSecurityServicesCheckboxes() {
    return this.#selectedEstateType.getText().then((text) => {
      if (text === 'Жилое имущество') {
        return null;
      }

      return this.#securityServicesCheckboxes.clickRandomRadiobuttonsOrCheckboxesByText({
        inputElementType: 'checkbox',
        parentOfLabelTag: 'label',
        randomCount: true,
      });
    });
  }

  clickAddObjectButton() {
    this.#addObjectButton.scrollElementToView();
    this.#addObjectButton.clickElement();
  }

  chooseRandomInsuranceObjectTypeValue() {
    this.#insuranceObjectTypeDropdown
      .chooseRandomElementsFromDropdownByText(this.#insuranceObjectTypeValues);
  }

  addRandomCountOfObjects() {
    const numClick = Randomizer.getRandomInteger(3, 1);

    for (let i = 1; i <= numClick; i += 1) {
      this.#addObjectButton.scrollElementToView();
      this.#addObjectButton.clickElement();

      const yearOfConstructionTextbox = new Textbox(
        new XPATH(
          `//div[contains(@class, "shrink-0 basis-5 pt-2") and contains(text(), "${i}")]/..//div[contains(@class, "shrink-0 basis-28")]//input`,
        ),
        'Year of construction textbox',
      );

      const incuranceAmountTextbox = new Textbox(
        new XPATH(
          `//div[contains(@class, "shrink-0 basis-5 pt-2") and contains(text(), "${i}")]/..//div[contains(@class, "shrink-0 basis-37")]//span[contains(@class, "ant-input-number-prefix")]/..//input`,
        ),
        'Year of construction textbox',
      );

      yearOfConstructionTextbox.scrollElementToView();
      yearOfConstructionTextbox.inputData(Randomizer.getRandomInteger(2024, 1965));
      incuranceAmountTextbox.inputData(Randomizer.getRandomInteger(333333333, 100000));
    }

    return numClick;
  }

  clickNextButton() {
    this.#nextButton.scrollElementToView();
    this.#nextButton.waitElementIsEnabled();
    this.#nextButton.clickElement();
  }

  getPremiumElement() {
    this.#nextButton.waitElementIsEnabled();
    return this.#premiumLabel.getText()
      .then((text) => StrUtils.removeAllNonNumbersFromString(text));
  }
}

module.exports = new EstateStep1();
