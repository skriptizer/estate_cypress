const path = require('path');
const { FlatCompat } = require('@eslint/eslintrc');

const oldConfig = path.join(__dirname, '.eslintrc.js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends(path.parse(oldConfig).base),
];
