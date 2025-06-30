class StrUtils {
  static toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  }

  static removeAllNonNumbersFromString(str) {
    return str.replace(/\D/g, '');
  }
}

module.exports = StrUtils;
