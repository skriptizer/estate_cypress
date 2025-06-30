const estateStep1 = require('../pageObjects/estate/estateStep1');
const estateStep2 = require('../pageObjects/estate/estateStep2');
const estateStep3 = require('../pageObjects/estate/estateStep3');
const estateStep4 = require('../pageObjects/estate/estateStep4');
const estateStep5 = require('../pageObjects/estate/estateStep5');
const mainPage = require('../pageObjects/mainPage');
const NodeEvents = require('../../support/nodeEvents');
const Randomizer = require('../../main/utils/random/randomizer');

exports.userPathEstate = (holder, insured, beneficiary) => {
  it('Estate manager path:', { scrollBehavior: false }, () => {
    cy.intercept('**/categories*').as('categories');
    cy.intercept('**regions*').as('regions');
    cy.intercept('**/loss-beneficiary-dictionary*').as('lossBeneficiary');

    NodeEvents.resetClient(holder).then((responses) => {
      responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
    });
    NodeEvents.resetClient(insured).then((responses) => {
      responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
    });
    NodeEvents.resetClient(beneficiary).then((responses) => {
      responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
    });

    cy.open('/');
    mainPage.pageIsDisplayed();
    mainPage.clickEstateButton();

    let categoriesTypeOne;
    let categoriesTypeTwo;
    let randomLossBeneficiaryText;
    let regionsCounts;

    cy.wait('@categories').then((interception) => {
      const categoriesResponse = interception.response.body;
      const categoriesArr = categoriesResponse.map((el) => ({ estate_type_id: el.estate_type_id }));
      categoriesTypeOne = categoriesArr.filter((cat) => cat.estate_type_id === 1).length;
      categoriesTypeTwo = categoriesArr.filter((cat) => cat.estate_type_id === 2).length;
    });

    cy.wait('@regions').then((interception) => {
      const regionsResponse = interception.response.body;
      const regionsArr = regionsResponse.map((el) => ({ title: el.title }));
      regionsCounts = regionsArr.length;
    });

    cy.wait('@lossBeneficiary').then((interception) => {
      const lossBeneficiaryResponse = interception.response.body;
      const lossBeneficiaryArr = lossBeneficiaryResponse.map((el) => ({ name: el.name }));
      const lossBeneficiaryTextArr = lossBeneficiaryArr.map((text) => text.name);
      const randomLossBeneficiary = Randomizer.getRandomElementByText(lossBeneficiaryTextArr);
      randomLossBeneficiaryText = lossBeneficiaryArr.find(
        (text) => text.name === randomLossBeneficiary,
      );
    });

    estateStep1.chooseAgent();
    estateStep1.chooseRandomFranchiseDamageValue();
    estateStep1.chooseRandomAgentComissionValue();

    estateStep1.chooseRandomEstateTypeValue().then((estateTypeId) => {
      estateStep1.chooseRandomInsuranceSumTypeValue();
      estateStep1.choosePolicyStartDate();
      estateStep1.turnOnReliableObjectSwitch();
      estateStep1.turnOnAwayOfBazaarSwitch();
      estateStep1.turnOnNotEmptySwitch();
      estateStep1.turnOnNoInsuredEventSwitch();
      estateStep1.chooseRandomFireFightingEquipmentsCheckboxes();
      estateStep1.chooseRandomSecurityServicesCheckboxes();

      const countOfObjects = estateStep1.addRandomCountOfObjects();
      estateStep1.getPremiumElement()
        .then((premium) => cy.setLocalStorage('sumToPay', premium));
      estateStep1.clickNextButton();

      estateStep2.pageIsDisplayed().then(async () => {
        for (let i = 1; i <= countOfObjects; i += 1) {
          estateStep2.clickObjectByNumber(i);
          if (estateTypeId) {
            estateStep2.chooseRandomTypeOfObjectValue(categoriesTypeOne);
          } else {
            estateStep2.chooseRandomTypeOfObjectValue(categoriesTypeTwo);
          }
          estateStep2.chooseRandomRegionValue(regionsCounts);
          estateStep2.inputAddressData();
          estateStep2.inputApartamentNumberData();
          estateStep2.clickSaveObjectButton();
        }
      });
    });

    estateStep2.clickSaveAllObjectsButton();
    estateStep2.clickNextButton();

    estateStep3.pageIsDisplayed();
    estateStep3.pageIsDisplayed().should('be.true');
    if (holder.natural_person_bool) {
      estateStep3.inputDataHolderIIN(holder.iin);
      estateStep3.clickSearchClientButton();
      estateStep3.getLastNameElement()
        .should('have.value', holder.last_name);
      estateStep3.getFirstNameElement()
        .should('have.value', holder.first_name);
      estateStep3.getOrSetMiddleNameElement(holder.middle_name)
        .should('have.value', holder.middle_name);
      estateStep3.getDateOfBirthElement()
        .should('have.value', holder.born.DMY);
      estateStep3.getSexText()
        .should('be.equal', holder.sex);
      estateStep3.getDocumentTypeText()
        .should('be.equal', holder.document_type);
      estateStep3.getDocumentNumberElement()
        .should('have.value', holder.document_number);
      estateStep3.getDocumentIssuedDateElement()
        .should('have.value', holder.document_gived_date.DMY);
      estateStep3.getOrSetDocumentIssuedByElement(holder.document_gived_by)
        .should('be.equal', holder.document_gived_by);
      estateStep3.getOrSetAddressElement(holder.address)
        .should('have.value', holder.address);
      estateStep3.getOrSetEmailElement(holder.email)
        .should('have.value', holder.email);
      estateStep3.inputPhoneNumber(holder.phone);
      estateStep3.clickSaveButton();
      estateStep3.clickNextButton();
    } else {
      estateStep3.clickJuridicalPersonRadioButton();
      estateStep3.inputDataHolderIIN(holder.iin);
      estateStep3.clickSearchClientButton();
      estateStep3.getJuridicalNameElement()
        .should('have.value', holder.juridical_person_name);
      estateStep3.getActivityKindElement()
        .should('have.attr', 'title', holder.activity_kind);
      estateStep3.getEconomicSectorElement()
        .should('have.attr', 'title', holder.economics_sector);
      estateStep3.getOrSetAddressElement(holder.address)
        .should('have.value', holder.address);
      estateStep3.getOrSetEmailElement(holder.email)
        .should('have.value', holder.email);
      estateStep3.inputPhoneNumber(holder.phone);
      estateStep3.clickSaveButton();
      estateStep3.clickNextButton();
    }

    estateStep4.pageIsDisplayed();
    estateStep4.pageIsDisplayed().should('be.true');
    estateStep4.clickAddInsuredButton();
    if (insured.natural_person_bool) {
      estateStep4.inputDataInsuredIIN(insured.iin);
      estateStep4.clickSearchClientButton();
      estateStep4.getLastNameElement()
        .should('have.value', insured.last_name);
      estateStep4.getFirstNameElement()
        .should('have.value', insured.first_name);
      estateStep4.getOrSetMiddleNameElement(insured.middle_name)
        .should('have.value', insured.middle_name);
      estateStep4.getDateOfBirthElement()
        .should('have.value', insured.born.DMY);
      estateStep4.getSexText()
        .should('be.equal', insured.sex);
      estateStep4.getDocumentTypeText()
        .should('be.equal', insured.document_type);
      estateStep4.getDocumentNumberElement()
        .should('have.value', insured.document_number);
      estateStep4.getDocumentIssuedDateElement()
        .should('have.value', insured.document_gived_date.DMY);
      estateStep4.getOrSetDocumentIssuedByElement(insured.document_gived_by)
        .should('be.equal', insured.document_gived_by);
      estateStep4.getOrSetAddressElement(insured.address)
        .should('have.value', insured.address);
      estateStep4.getOrSetEmailElement(insured.email)
        .should('have.value', insured.email);
      estateStep4.inputPhoneNumber(insured.phone);
      estateStep4.clickSaveButton();
      estateStep4.clickNextButton();
    } else {
      estateStep4.clickJuridicalPersonRadioButton();
      estateStep4.inputDataInsuredIIN(insured.iin);
      estateStep4.clickSearchClientButton();
      estateStep4.getJuridicalNameElement()
        .should('have.value', insured.juridical_person_name);
      estateStep4.getActivityKindElement()
        .should('have.attr', 'title', insured.activity_kind);
      estateStep4.getEconomicSectorElement()
        .should('have.attr', 'title', insured.economics_sector);
      estateStep4.getOrSetAddressElement(insured.address)
        .should('have.value', insured.address);
      estateStep4.getOrSetEmailElement(insured.email)
        .should('have.value', insured.email);
      estateStep4.inputPhoneNumber(insured.phone);
      estateStep4.clickSaveButton();
      estateStep4.clickNextButton();
    }

    estateStep5.pageIsDisplayed();
    estateStep5.pageIsDisplayed().should('be.true');
    if (beneficiary.natural_person_bool) {
      estateStep5.inputDataBeneficiaryIIN(beneficiary.iin);
      estateStep5.clickSearchClientButton();
    } else {
      estateStep5.clickNaturalPersonSwitch();
      estateStep5.inputDataBeneficiaryIIN(beneficiary.iin);
      estateStep5.clickSearchClientButton();
    }

    estateStep5.clickRandomLossBeneficiaryDropdown(randomLossBeneficiaryText);
    estateStep5.inputExtraInfoTextbox();
    estateStep5.clickSaveButton();
    estateStep5.clickIssuePolicyButton();
    estateStep5.clickKaspiBillCheckbox();
    estateStep5.clickIssueButton();
    estateStep5.getPolicyNumberText()
      .then((policyNumber) => cy.setLocalStorage('policyNumber', policyNumber));
    if (holder.natural_person_bool) {
      estateStep5.getPaymentCode()
        .then((code) => cy.setLocalStorage('paymentCode', code));
    } else {
      cy.setLocalStorage('installmentPayment', true);
    }
  });
};
