const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../../', '.env.test'), override: true });

const envDirectory = path.join(__dirname, '../../../../');
const loaderFileLocation = path.join(__dirname, 'JSONLoader.js');
const testClientsFileLocation = path.join(__dirname, '../../../resources/data/testClients.json');
const testCarsFileLocation = path.join(__dirname, '../../../resources/data/testCars.json');
const JSONDirectory = path.join(__dirname, '../../../resources');

const getFiles = (directory, extension) => {
  const allFiles = fs.readdirSync(directory);
  const selectedFiles = allFiles.filter((file) => file.endsWith(extension));
  allFiles.forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const nestedFiles = getFiles(fullPath, extension);
      selectedFiles.push(...nestedFiles.map((nestedFile) => path.join(file, nestedFile)));
    }
  });

  return selectedFiles;
};

const generateClassInit = (selectedFiles, directory) => `class JSONLoader {\n${selectedFiles.map((file) => {
  const variableName = path.parse(file).name;
  return `\tstatic get ${variableName}() {\n\t\tconst ${variableName} = require('${path.join(directory, file)}');\n\t\treturn JSON.parse(JSON.stringify(${variableName}));\n\t}\n\n`;
}).join('')}`;

const generateJSONLoader = (filePath, directory, extension) => {
  const files = getFiles(directory, extension);
  const classInit = generateClassInit(files, directory);
  const classExport = '}\n\nmodule.exports = JSONLoader;';
  fs.writeFileSync(filePath, classInit + classExport);
};

const setConfigData = (directory, extension) => {
  const files = getFiles(directory, extension);
  const configFile = files.filter((file) => file.includes('config')).pop();
  if (configFile) {
    const filePath = `${directory}/${configFile}`;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.parallel = process.argv.includes('--parallel');
    data.setPolicyWaitingTWB = process.argv.includes('--setPolicyWaitingTWB');
    try {
      data.verification = Boolean(JSON.parse(process.env.VERIFICATION ?? data.verification));
    } catch (error) { // eslint-disable-next-line no-console
      console.log('  [err]   incorrect value of "VERIFICATION" .env variable!');
    }

    try {
      const value = JSON.parse(process.env.SET_POLICY_WAITING_TWB ?? data.setPolicyWaitingTWB);
      data.setPolicyWaitingTWB = Boolean(value);
    } catch (error) { // eslint-disable-next-line no-console
      console.log('  [err]   incorrect value of "SET_POLICY_WAITING_TWB" .env variable!');
    }

    try {
      data.getPolicyTWB = Boolean(JSON.parse(process.env.GET_POLICY_TWB ?? data.getPolicyTWB));
    } catch (error) { // eslint-disable-next-line no-console
      console.log('  [err]   incorrect value of "GET_POLICY_TWB" .env variable!');
    }

    if (process.env.GATEWAY_URL) {
      const value = process.env.GATEWAY_URL.match(/\b(?:localhost|dev|staging)\b/g);
      if (value) {
        data.environment = value.pop();
      } else { // eslint-disable-next-line no-console
        console.log('  [err]   incorrect value of "GATEWAY_URL" .env variable!');
      }
    } else { // eslint-disable-next-line no-console
      console.log('  [err]   "GATEWAY_URL" .env variable not exists!');
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }
};

const checkEnvExists = (directory, extension) => {
  const files = getFiles(directory, extension);
  if (!files.length) throw new Error('[err]   .env.test file not exists in root directory!');
};

const generateTestDataFile = (filePath) => {
  const emptyObj = {};
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify(emptyObj, null, 2), 'utf8');
};

checkEnvExists(envDirectory, '.test');
setConfigData(JSONDirectory, '.json');
generateTestDataFile(testCarsFileLocation);
generateTestDataFile(testClientsFileLocation);
generateJSONLoader(loaderFileLocation, JSONDirectory, '.json');
