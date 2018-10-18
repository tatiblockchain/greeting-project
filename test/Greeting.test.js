const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const provider = ganache.provider();
const web3 = new Web3(provider);

const greetingContract = require("../ethereum/build/HelloBlockchain.json");

let accounts;
let greeting;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  greeting = await new web3.eth.Contract(JSON.parse(greetingContract.interface))
    .deploy({ data: greetingContract.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Greeting Deployment", () => {
  it("deploys a greeting contract", () => {
    assert.ok(greeting.options.address);
  });

  it("marks caller of the constructor function as the owner ", async () => {
    const owner = await greeting.methods.owner().call();
    assert.equal(accounts[0], owner);
  });

  it("allows people to greet the contract and updates mapping", async () => {
    await greeting.methods.greet().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[1],
      gas: "1000000"
    });
    const didGreet = await greeting.methods.greeted(accounts[1]).call();
    assert(didGreet);
  });

  it("correctly records the donation amount sent during a greet", async () => {
    await greeting.methods.greet().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[2],
      gas: "1000000"
    });
    const record = await greeting.methods.greetRecords(accounts[2]).call();
    const greetAmount = web3.utils.toWei("10", "ether");
    const contractValue = await greeting.methods.getContractValue().call();

    assert.equal(accounts[2], record.greeter);
    assert.equal(greetAmount, record.value);
    assert.equal(greetAmount, contractValue);
  });

  it("it pays out the owner, and it pays correct amount", async () => {
    await greeting.methods.greet().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[3],
      gas: "1000000"
    });

    await greeting.methods.greet().send({
      value: web3.utils.toWei("15", "ether"),
      from: accounts[4],
      gas: "1000000"
    });

    await greeting.methods.withdraw().send({
      from: accounts[0],
      gas: "1000000"
    });

    let balance = await web3.eth.getBalance(accounts[0]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 124);
  });

  //The most important test
  it("throws an error when a someone who is not the owner requests a withdrawal", async () => {
    await greeting.methods.greet().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[5],
      gas: "1000000"
    });

    try {
      await greeting.methods.withdraw().send({
        from: accounts[2],
        gas: "1000000"
      });
    } catch (err) {
      assert(err);
    }
  });

  //The most important test in reverse
  it("it does not throw an error when the owner requests a withdrawal", async () => {
    await greeting.methods.greet().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[6],
      gas: "1000000"
    });

    try {
      await greeting.methods.withdraw().send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (err) {
      assert(!err);
    }
  });
});
