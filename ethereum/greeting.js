import web3 from "./web3";
import greeting from "./build/HelloBlockchain.json";

//Re-deploy Contract and replace with own contract
//TODO Replace Contract Address . . .
const contractInstance = new web3.eth.Contract(
  JSON.parse(greeting.interface),
  "replace-contract-address-here"
);

export default contractInstance;
