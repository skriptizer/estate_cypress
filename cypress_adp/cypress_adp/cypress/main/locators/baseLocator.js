class BaseLocator {
  #value;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}

module.exports = BaseLocator;
