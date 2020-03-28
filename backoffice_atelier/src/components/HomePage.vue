  <template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" v-if="!connected">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav></b-collapse>
    </b-navbar>
    <h1 class="text-center mt-5">Connexion</h1>
    <b-form style="margin:auto; width:30%;" @submit="onSubmit" class="mt-4" v-if="show">
      <b-form-group id="input-group-1" label="Entrez votre adresse mail :" label-for="input-1">
        <b-form-input id="input-1" type="email" required v-model="mail" placeholder="Enter email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Entrez votre mot de passe :" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          required
          v-model="pwd"
          placeholder="Mot de passe"
        ></b-form-input>
      </b-form-group>
      <b-button pill type="submit" variant="info">Se connecter</b-button>
    </b-form>
    <b-alert
      v-if="err & show"
      class="w-25 mx-auto h-25 mt-3"
      variant="danger"
      show
    >Adresse Mail ou mot de passe incorrect</b-alert>
</div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar'
export default {
  name: 'HomePage',
  components: {
    Navbar
  },
  data () {
    return {
      pwd:"",
      mail:"",
      url: "http://docketu.iutnc.univ-lorraine.fr:60080/joueurs/auth",
      show: true,
      token: null,
      msgErreur:"",
      connected: false,
      err: false,
      test : null
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios({
        method: "post",
        url: this.url,
        auth: {
          username: this.mail,
          password: this.pwd
        }
      })
        .then(response => {
          if (response.data.type === "error") {
            this.err = true;
          } else {
            if(response.data.role == "a") this.$router.replace({name: "Photo", params:{ props:{connected:true, admin:true, token: response.data.token} }});
            else this.$router.replace({name: "Photo", params:{ props:{connected:true, admin:false, token: response.data.token} }});
          }
        })
        .catch(err => {
          this.msgErreur = "Adresse mail ou mot de passe incorrect";
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
