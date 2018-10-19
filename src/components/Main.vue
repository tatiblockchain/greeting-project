<template >
  <div class="container">
  <br>
  <div class="jumbotron jumbotron-fluid bg-primary">
    <h2>Contract Variables</h2>
    <!-- Beginning of the Row -->
    <div class="row">
      <div class="col-md">
        <div class="contract-details margin">
          <p>Contract Owner</p>
          <p>{{owner}}</p>
        </div>
      </div>

      <div class="col-md">
        <div class="contract-details margin">
          <p>Number of Greetings</p>
          <p>{{numberGreetings}}</p>
        </div>
      </div>

      <div class="col-md">
        <div class="contract-details margin">
          <p>Contract Balance</p>
          <p>{{contractBalance}}</p>
        </div>
      </div>

    </div>
    <!-- End of the ROW -->

    <br>
    <br>

      <!-- Begining of GREETING ROW -->
        <div class="contract-details margin">
          <div class="row">
            <div class="col-md">
              <p>Make a Greeting to the smart contract, enter the amount of ether you would like to greet the contract with. Amount cannot be zero (for this application).</p>
            </div>
            <div class="col-md">
              <input
              type="number"
              v-validate="'required'"
              name="ether"
              class="form-control"
              placeholder="Enter amount in ether"
              v-model="ether"
              v-on:input="validateEther"
              >
              <br>
              <button class="btn btn-success" @click="greeting"><i v-if="loading1" class="fa fa-circle-o-notch fa-spin"></i>Greet Contract</button>
              <br>
              <br>
              <div v-if="message1 !== ''" class="alert alert-info" role="alert">
                  {{message1}}
              </div>
            </div>
          </div>
        </div>
      <!-- End of GREETING ROW -->
      <br>
      <br>

      <!-- Begining of CHECK ADDRESS ROW -->
      <div class="contract-details margin">
        <div class="row">
          <div class="col-md">
            <p>Check if an address has made a greeting, enter the address to the right and call the smart contract records to see of this address has greeted the smart contract.</p>
          </div>
          <div class="col-md">
            <input
            type="text"
            v-validate="'required'"
            name="address"
            class="form-control"
            placeholder="Enter ethereum address"
            v-model="address"
            v-on:input="validateAddress"
            >
            <br>
            <button class="btn btn-success" @click="checkAddress"><i v-if="loading2" class="fa fa-circle-o-notch fa-spin"></i>Check</button>
            <br>
            <br>
            <div v-if="message2 !== ''" class="alert alert-info" role="alert">
                {{message2}}
            </div>
            <p>{{hasGreeted}}</p>
          </div>
        </div>
      </div>
      <!-- End of CHECK ADDRESS ROW -->
      <br>
      <br>

      <!-- Begining of CHECK DETAILS ROW -->
      <div class="contract-details margin">
        <div class="row">
          <div class="col-md">
            <p>Check details of an address that has greeted the contract, this call queries the smart contract to get details of the greeting and the amount of money sent with the greeting.</p>
          </div>
          <div class="col-md">
            <input
            type="text"
            v-validate="'required'"
            name="address1"
            class="form-control"
            placeholder="Enter ethereum address"
            v-model="address1"
            v-on:input="validateAddress1"
            >
            <br>
            <button class="btn btn-success" @click="checkAddress1"><i v-if="loading3" class="fa fa-circle-o-notch fa-spin"></i>Check</button>
            <div v-if="!isEmpty">
              <br>
              <br>
              <div v-if="message3 !== ''" class="alert alert-info" role="alert">
                  {{message3}}
              </div>
              <p>This address: {{greetRecords.greeter}}</p>
              <p>Has greeted with {{convertEther(greetRecords.value)}} ether</p>
            </div>
          </div>
        </div>
      </div>
      <!-- End of CHECK DETAILS ROW -->
      <br>
      <br>

  </div>
  </div>
</template>



<script>
//Importing the Ethereum stuff . . .
import web3 from "../../ethereum/web3";
import greeting from "../../ethereum/greeting";

export default {
  data() {
    return {
      etherValidation: false,
      addressValidation: false,
      address1Validation: false,
      ether: "",
      address: "",
      address1: "",
      loading1: false,
      loading2: false,
      loading3: false,
      hasGreeted: "",
      greetRecords: {},
      owner: "",
      numberGreetings: "",
      contractBalance: "",
      message1: "",
      message2: "",
      message3: ""
    };
  },
  computed: {
    isEmpty() {
      return Object.keys(this.greetRecords).length === 0;
    }
  },
  methods: {
    convertEther(value) {
      return web3.utils.fromWei(value, "ether");
    },
    validateEther() {
      const self = this;
      this.$validator.validate("ether").then(function(response) {
        self.etherValidation = response;
      });
    },
    validateAddress() {
      const self = this;
      this.$validator.validate("address").then(function(response) {
        self.addressValidation = response;
      });
    },
    validateAddress1() {
      const self = this;
      this.$validator.validate("address1").then(function(response) {
        self.address1Validation = response;
      });
    },
    async greeting() {
      if (this.etherValidation) {
        try {
          this.loading1 = true;
          this.message1 =
            "your transaction has been sent to the network, this might take a while, confirmation will come from your MetaMask account";

          const accounts = await web3.eth.getAccounts();

          await greeting.methods.greet().send({
            from: accounts[0],
            value: web3.utils.toWei(this.ether, "ether")
          });

          alert("you have succesfully greeted the contract");
          this.ether = "";

          this.loading1 = false;
          this.message1 = "";
          this.populateVariables();
        } catch (err) {
          alert(err);
          this.loading1 = false;
          this.message1 = "";
        }
      } else {
        alert("enter ether to greet contract");
      }
    },
    async checkAddress() {
      if (this.addressValidation) {
        try {
          this.loading2 = true;
          this.message2 =
            "your transaction has been sent to the network, this might take a while, confirmation will come from your MetaMask account";

          const greeted = await greeting.methods.greeted(this.address).call();
          this.hasGreeted = greeted;

          this.loading2 = false;
          this.message2 = "";
          this.address = "";
        } catch (err) {
          alert(err);
          this.loading2 = false;
          this.message2 = "";
        }
      } else {
        alert("please enter ethereum address to proceed");
      }
    },
    async checkAddress1() {
      if (this.address1Validation) {
        try {
          this.loading3 = true;
          this.message3 =
            "your transaction has been sent to the network, this might take a while, confirmation will come from your MetaMask account";

          const greeted = await greeting.methods
            .greetRecords(this.address1)
            .call();
          this.greetRecords = greeted;

          this.loading3 = false;
          this.message3 = "";
          this.address1 = "";
        } catch (err) {
          alert(err);
          this.loading3 = false;
          this.message3 = "";
        }
      } else {
        alert("please enter ethereum address to proceed");
      }
    },
    async populateVariables() {
      try {
        const summary = await greeting.methods.getSummary().call();
        const ether = web3.utils.fromWei(summary[2], "ether");

        this.owner = summary[0];
        this.numberGreetings = summary[1];
        this.contractBalance = ether;
      } catch (err) {
        alert(err);
      }
    }
  },
  created() {
    this.populateVariables();
  }
};
</script>
