import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //We are in the browser metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //User is not runnig metamask OR we are on the server
  //TODO Replace own Infura key below
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/replace-with-own-infura-key"
  );

  web3 = new Web3(provider);
}

export default web3;
