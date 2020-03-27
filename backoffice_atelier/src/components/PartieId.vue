<template>
  <div>
    <NavBar/>
    <p class="mt-3">
      ID de la partie
      <input type="text" v-model="checkIDP" />
      <b-button pill variant="outline-info" v-on:click="afficherPartie">
        <router-link class="white" :to="{ name: 'partieId', params:{id : checkIDP, props:{connected:true, admin:true, token: this.$route.params.props.token} } }">Rechercher</router-link>
      </b-button>
    </p>
    <b-table v-if="bool" striped hover :items="partieList" :fields="fields"></b-table>
    <p v-if="wrong">Aucune partie avec cet ID n'est répértoriée.</p>
    <p v-if="init">Entrez l'ID d'une partie</p>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from './Navbar';
export default {
    name:"PartieId",
    components : {
      NavBar
    },
  data() {
    return {
      fields: [
        {
          key: "Joueur",
          sortable: false
        },
        {
          key: "Série",
          sortable: false
        },
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
      checkIDP: "1",
      partieList: [],
      bool: false,
      init: true,
      wrong: false
    };
  },
  methods: {
    afficherPartie() {
      axios
        .get("http://localhost:19080/parties/" + this.$route.params.id, {
          headers: { 
                "Authorization": "Bearer " + this.$route.params.props.token
            }
        })
        .then(response => {
          this.partieList = [];
          this.partieList.push({
            Score: response.data.partie.score,
            NbPhotos: response.data.partie.nb_photos,
            Etat: response.data.partie.statut,
            Série: response.data.partie.serie[0].ville,
          Joueur: response.data.partie.joueur[0].pseudo
          });
          this.init = false;
          this.bool = true;
        })
        .catch(error => {
          this.init = false;
          this.wrong = true;
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