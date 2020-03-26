<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./components/Navbar"
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      checkIDJ: 1,
      checkIDP: 1,
      show: true,
      mail: "",
      pwd: "",
      token: null,
      msgErreur: ""
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.black {
  color: black;
  text-decoration: none !important;
}
.black:hover {
  color: black;
}
.white {
  color: white;
  text-decoration: none !important;
}
.white:hover {
  color: white;
}
</style>
