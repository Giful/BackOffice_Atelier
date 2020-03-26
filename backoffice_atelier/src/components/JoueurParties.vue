<template>
  <div>
    <NavBar/>
    <p class="mt-3">
      ID de l'utilisateur
      <input type="text" v-model="checkID" />
      <b-button pill variant="outline-info" v-on:click="afficherPartiesJ">
        <router-link class="white" v-bind:to="'/joueur/'+checkID+'/parties'">Rechercher</router-link>
      </b-button>
    </p>
    <b-table v-if="bool" striped hover :items="joueurPList" :fields="fields"></b-table>
    <p v-else>Cet utilisateur n'existe pas ou n'a pas joué de parties.</p>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from './Navbar';
export default {
    name:"JoueurParties",
    components:{
      NavBar
    },
  data() {
    return {
      fields: [
        {
          key: "Score",
          sortable: false
        },
        {
          key: "NbPhotos",
          sortable: false
        },
        {
          key: "Etat",
          sortable: false
        }
      ],
      checkID: 1,
      joueurPList: [],
      bool: true,
      connected:false
    };
  },
  created: function() {
    axios
      .get(
        "http://localhost:19080/joueurs/" + this.$route.params.id + "/parties"
      , {
        headers: { 
                "Authorization": "Bearer " + this.$route.params.props.token
            }
      })
      .then(response => {
        response.data.parties.forEach(pj => {
            console.log(pj.partiejoueur.score);
          this.joueurPList.push({
            Score: pj.partiejoueur.score,
            NbPhotos: pj.partiejoueur.nb_photos,
            Etat: pj.partiejoueur.statut
          });
        });
        this.bool = true;
      })
      .catch(error => {
        this.bool = false;
      });
  },
  methods: {
    afficherPartiesJ() {
      axios
        .get(
          "http://localhost:19080/joueurs/" + this.$route.params.id + "/parties"
        , {
          headers: { 
                "Authorization": "Bearer " + this.$route.params.props.token
            }
        })
        .then(response => {
            this.joueurPList = [];
        response.data.parties.forEach(pj => {
            console.log(pj.partiejoueur.score);
          this.joueurPList.push({
            Score: pj.partiejoueur.score,
            NbPhotos: pj.partiejoueur.nb_photos,
            Etat: pj.partiejoueur.statut
          });
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
.white {
  color: #17a2b8;
  text-decoration: none !important;
}
.white:hover {
  color: white;
}
</style>