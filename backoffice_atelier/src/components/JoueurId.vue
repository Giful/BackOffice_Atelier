<template>
  <div>
    <NavBar/>
    <p class="mt-3">
      ID de l'utilisateur
      <input type="text" v-model="checkIDJ" />
      <b-button pill variant="outline-info" v-on:click="afficherJoueur">
        <router-link class="white" :to="{ name: 'joueursId', params:{id : checkIDJ, props:{connected:true, admin:true, token: this.$route.params.props.token} } }">Rechercher</router-link>
      </b-button>
    </p>
    <b-table v-if="bool" striped hover :items="joueurList" :fields="fields"></b-table>
    <p v-else>Aucun utilisateur avec cet ID n'est répértorié.</p>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from './Navbar';
export default {
  name: "JoueurId",
  components: {
    NavBar
  },
  data() {
    return {
      fields: [
        {
          key: "Joueur",
          sortable: true
        },
        {
          key: "Mail",
          sortable: true
        }
      ],
      checkIDJ: 1,
      joueurList: [],
      bool:true,
      connected:false
    };
  },
  created: function() {
    axios
        .get("http://docketu.iutnc.univ-lorraine.fr:60080/joueurs/" + this.$route.params.id, {
          headers: { 
                "Authorization": "Bearer " + this.$route.params.props.token
            }
        })
        .then(response => {
          this.joueurList = [];
           this.joueurList.push({
            Joueur: response.data.joueur.pseudo,
            Mail: response.data.joueur.mail
          });
          this.checkIDJ = this.$route.params.id;
          this.bool = true;
        })
        .catch(error => {
          this.bool = false;
        });
  },
  methods: {
    afficherJoueur() {
      axios
        .get("http://docketu.iutnc.univ-lorraine.fr:60080/joueurs/" + this.$route.params.id, {
          headers: { 
                "Authorization": "Bearer " + this.$route.params.props.token
            }
        })
        .then(response => {
          this.joueurList = [];
           this.joueurList.push({
            Joueur: response.data.joueur.pseudo,
            Mail: response.data.joueur.mail
          });
          this.bool = true;
        })
        .catch(error => {
          this.bool = false;
        });
    }
  }
};
</script>
<style scoped>
.white{
  color:#17a2b8;
  text-decoration: none !important;
}
.white:hover{
  color: white;
}
</style>