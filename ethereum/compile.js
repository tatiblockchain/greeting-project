const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

//Start by creating a folder for the compiled results, called build (Our compiled files will be stored there)
const buildPath = path.resolve(__dirname, "build");

//make sure we delete any folder that exists in this path
fs.removeSync(buildPath);

//Compile the Solidity Contract, and store results in the path we created above
const contractPath = path.resolve(
  __dirname,
  "contracts",
  "HelloBlockchain.sol"
);
const source = fs.readFileSync(contractPath, "utf8");
const output = solc.compile(source, 1).contracts;

//rebuild the 'build' folder again, making sure its a new directory
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
