# greeting-project

This project contains Ethereum Smart Contract Implementation on a VueJS project. It is a smart contract greeting code in solidity implemented with a vueJS front end web-application.

The full deployed website is running here [Greet Project Website](https://greet.tatiblockchain.co.za)

There are detailed instructions on setting up, compiling and deploying the the [Ethereum Smart Contract on our website.](https://documentation.tatiblockchain.co.za/get-started).

Before you proceed, please re-deploy the smart-contract. Update the deploy script here - root/ethereum/deploy.js with a 12 word phrase and http provider.
You also need to update the http provider in the web.js file under ethereum folder.
You can use [Infura for http provider](https://infura.io). Instruction are on our website.

You can also deploy this contract from [Ethereum Remix tool](http://remix.ethereum.org) and paste the deployed contract in to the project, in the greeting.js file under ethereum folder, but you still need the http provider to run the application.

## Project setup

```
npm install
```

## Run tests with Mocha

```
npm run test
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
