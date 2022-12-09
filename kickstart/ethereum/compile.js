const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
// deleting the build folder first if it exists
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // removes the build folder i.e., previous compilation code

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // check if build exists if not creates one

for (let contract in output) { // foreach key in output. It has comtract and contractfactory keys.
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'), // create the json
        output[contract] // write the contents into the respective json file
    );
}
