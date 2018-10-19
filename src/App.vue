<template>
  <div id="app">

    <Main />

  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "app",
  components: {
    Main
  }
};
</script>



<style>
#app {
  font-family: "Space Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background: #448aff;
  color: #f5f5f5;
}

.shadow {
  -webkit-box-shadow: 0 10px 6px -6px #283593;
  -moz-box-shadow: 0 10px 6px -6px #283593;
  box-shadow: 0 10px 6px -6px #283593;
}

.effect {
  -webkit-box-shadow: 0 10px 6px -6px #283593;
  -moz-box-shadow: 0 10px 6px -6px #283593;
  box-shadow: 0 10px 6px -6px #283593;
  border-radius: 10px;
}

.dontmove {
  position: fixed;
  z-index: 3;
  top: 0;
  width: 100%;
}

a {
  color: #1a237e;
}

.contract-details {
  border-radius: 10px;
  background: #448aff;
  padding: 5px;
  margin-top: 10px;
}

.margin {
  margin-left: 15px;
  margin-right: 15px;
}

.outside {
  font-family: "Space Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 150px;
}
</style>
