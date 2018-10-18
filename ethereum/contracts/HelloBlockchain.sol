pragma solidity ^0.4.20;

contract HelloBlockchain {

    address public owner;
    uint public numberGreetings;


    struct Greeting {
        address greeter;
        uint value;
    }
    mapping(address => bool) public greeted;
    mapping(address => Greeting) public greetRecords;


    modifier restricted() {
        require (msg.sender == owner);
        _;
    }

    constructor () public {
        owner = msg.sender;
        numberGreetings = 0;
    }

    function greet() public payable {
        numberGreetings ++;
        greeted[msg.sender] = true;

        Greeting memory newGreet = Greeting({
            greeter: msg.sender,
            value: msg.value
        });
        greetRecords[msg.sender] = newGreet;

    }


    function withdraw() public restricted {

        owner.transfer(address(this).balance);

    }

    function getContractValue() public view returns(uint) {
        return address(this).balance;
    }

    function getSummary() public view returns (address, uint, uint) {
        return (
            owner,
            numberGreetings,
            address(this).balance
            );
    }
}
