<template>
  <div>
    <p class="mt-3">
      ID de la partie
      <input type="text" v-model="checkIDP" />
      <b-button pill variant="outline-info" v-on:click="afficherPartie">
        <router-link class="white" v-bind:to="'/partie/'+checkIDP">Rechercher</router-link>
      </b-button>
    </p>
    <b-table v-if="bool" striped hover :items="partieList" :fields="fields"></b-table>
    <p v-else>Aucune partie avec cet ID n'est répértoriée.</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name:"PartieId",
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
      checkIDP: 1,
      partieList: [],
      bool: true
    };
  },
  created: function() {
    axios
      .get("http://localhost:19080/parties/" + this.$route.params.id)
      .then(response => {
        this.partieList = [];
        this.partieList.push({
          Score: response.data.partie.score,
          NbPhotos: response.data.partie.nb_photos,
          Etat: response.data.partie.statut,
          Série: response.data.partie.serie[0].ville,
          Joueur: response.data.partie.joueur[0].pseudo
        });
        this.bool = true;
      })
      .catch(error => {
        this.bool = false;
      });
  },
  methods: {
    afficherPartie() {
      axios
        .get("http://localhost:19080/parties/" + this.$route.params.id)
        .then(response => {
          this.partieList = [];
          this.partieList.push({
            Score: response.data.partie.score,
            NbPhotos: response.data.partie.nb_photos,
            Etat: response.data.partie.statut,
            Série: response.data.partie.serie[0].ville,
          Joueur: response.data.partie.joueur[0].pseudo
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