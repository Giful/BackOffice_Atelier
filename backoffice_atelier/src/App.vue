<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><router-link to="/" class="white">Page d'accueil</router-link></b-nav-item>
        <b-nav-item-dropdown href="#" text="Joueurs">
          <b-dropdown-item><router-link to="/joueurs" class="black">Afficher tous les joueurs</router-link></b-dropdown-item>
          <b-dropdown-item><router-link v-bind:to="'/joueur/' + checkIDJ" class="black">Afficher un joueur selon son ID</router-link></b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown href="#" text="Parties">
          <b-dropdown-item><router-link to="/parties" class="black">Afficher toutes les parties</router-link></b-dropdown-item>
          <b-dropdown-item><router-link v-bind:to="'/partie/' + checkIDP" class="black">Afficher une partie selon son ID</router-link></b-dropdown-item>
          <b-dropdown-item><router-link v-bind:to="'/joueur/' + checkIDJ + '/parties'" class="black">Afficher les parties d'un seul joueur</router-link></b-dropdown-item>
       </b-nav-item-dropdown>
       <b-nav-item><router-link to="/addPhoto" class="white">Ajouter des photos</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav >
        <b-nav-item>
          Test
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <router-view />
    <b-form style="margin:auto; width:30%;" @reset="onReset" class="mt-4" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Entrez votre adresse mail :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="email"
          required
          v-model="mail"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Entrez votre mot de passe :" label-for="input-2">
        <b-form-input
          id="input-2"
          required
          v-model="pwd"
          placeholder="Mot de passe"
        ></b-form-input>
      </b-form-group>
      <b-button on:click="onSubmit" variant="info">Submit</b-button>
      <b-button on:click="onReset" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      checkIDJ: 1,
      checkIDP: 1,
      connected: false,
      show:true,
      url : "http://localhost:19080/joueurs/auth",
      auth: null,
      mail:"",
      pwd: "",
      token : null
    }
  },
   methods: {
      onSubmit() {
        console.log("SLT")
        this.auth = Buffer.from(this.mail + ":" + this.pwd,"utf8").toString("base64");
        axios({
          method: "post",
          url : this.url,
          headers: {
            "Authorization": "Basic" + this.auth
          }
        })
        .then(result => {
          if(result.data.type === "error") {
            console.log("ok");
            alert({
              title: "Connexion",
              okButtonText: "OK",
              message : "Mauvaise adresse mail ou mauvais mot de passe"
            });
          }
          else{
            this.token = result.data.token;
            this.$router.push("/joueurs"+ result.data.id)
            this.connected=true;
          }
        })
        .catch(err => {
          console.log("non");
          console.error(err.response.request._response);
          alert({
            title: "Série",
            okButtonText: "OK",
            message: "Mauvaise adresse mail ou mauvais mot de passe"
          });
        });
      },
      onReset() {
        this.mail = ''
        this.pwd = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
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

.black{
  color:black;
  text-decoration: none !important;
}
.black:hover{
  color: black;
}
.white{
  color:white;
  text-decoration: none !important;
}
.white:hover{
  color: white;
}
</style>
