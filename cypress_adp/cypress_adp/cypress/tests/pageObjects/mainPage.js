const BaseForm = require('../../main/baseForm');
const XPATH = require('../../main/locators/baseLocatorChildren/XPATH');
const Button = require('../../main/elements/baseElementChildren/button');

class MainPage extends BaseForm {
  #estateButton;

  constructor() {
    super(new XPATH('//div[@class="ant-card-body"]'), 'main page');
    this.#estateButton = new Button(new XPATH('//a[@href="/estate/create"]'), 'estate button');
  }
  
  clickEstateButton() {
    this.#estateButton.clickElement();
  }
}

module.exports = new MainPage();
