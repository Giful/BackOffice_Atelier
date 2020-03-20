<template>
  <div>
    <p class="mt-3">
      ID de l'utilisateur
      <input type="text" v-model="checkIDJ" />
      <b-button pill variant="outline-info" v-on:click="afficherJoueur">
        <router-link class="white" v-bind:to="'/joueur/'+checkIDJ">Rechercher</router-link>
      </b-button>
    </p>
    <b-table v-if="bool" striped hover :items="joueurList" :fields="fields"></b-table>
    <p v-else>Aucun utilisateur avec cet ID n'est répértorié.</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "JoueurId",
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
      bool:true
    };
  },
  created: function() {
    axios
        .get("http://localhost:19080/joueurs/" + this.$route.params.id)
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
  },
  methods: {
    afficherJoueur() {
      axios
        .get("http://localhost:19080/joueurs/" + this.$route.params.id)
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