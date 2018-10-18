const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const hello = require("./build/HelloBlockchain.json");

//Define the Wallet Provider
//TODO(Replace the 12 word phrase and INFURA link with your own before running this code)
const provider = new HDWalletProvider(
  "your twelve word phrase goes here",
  "https://rinkeby.infura.io/v3/your-infura-key-goes-here"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(hello.interface))
    .deploy({
      data: "0x" + hello.bytecode
    })
    .send({ gas: "5000000", from: accounts[0] });

  console.log("Our contract was deployed to : ", result.options.address);
};

deploy();

//Deployment address 0x23f8944b98Bec82fE40C630C21D5f51d3805CbfF
