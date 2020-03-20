<template>
  <div>
    <b-table striped hover :items="joueurData" :fields="fields"></b-table>
    <b-button pill>Page actuelle : {{this.page}}</b-button>
    <b-button pill>Nombre de pages : {{this.pageMax}}</b-button>

    <b-input-group-append class="mt-4">
      <b-button pill v-if="this.page == this.pageMin" variant="outline-info" disabled>Page Précédente</b-button>
      <b-button pill v-else variant="outline-info" v-on:click="afficherPagePrec">Page Précédente</b-button>
      <b-button pill v-if="this.page == this.pageMax" variant="outline-info" disabled>Page Suivante</b-button>
      <b-button pill v-else variant="outline-info" v-on:click="afficherPageSuiv">Page Suivante</b-button>
    </b-input-group-append>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Parties",
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
      joueurData: [],
      page: 1,
      pageMax: "",
      pageMin: ""
    };
  },
  created: function() {
    axios
      .get("http://localhost:19080/joueurs?page=" + this.page)
      .then(response => {
        response.data.joueurs.forEach(j => {
          this.joueurData.push({
            Joueur: j.joueur.pseudo,
            Mail: j.joueur.mail
          });
        });
        let objl = response.data.links.last;
        let objlJSON = JSON.stringify(objl)
          .slice(24)
          .slice(0, 1);
        let last = parseInt(objlJSON);
        let objf = response.data.links.first;
        let objfJSON = JSON.stringify(objf)
          .slice(24)
          .slice(0, 1);
        let first = parseInt(objfJSON);
        this.pageMax = last;
        this.pageMin = first;
      })
      .catch(error => {
        this.joueurData = [];
      });
  },
  methods: {
    afficherPagePrec() {
      this.joueurData = [];
      axios
        .get("http://localhost:19080/joueurs?page=" + (this.page - 1))
        .then(response => {
          response.data.joueurs.forEach(j => {
            this.joueurData.push({
              Joueur: j.joueur.pseudo,
              Mail: j.joueur.mail
            });
          });
          let obj = response.data.links.first;
          let myJSON = JSON.stringify(obj)
            .slice(24)
            .slice(0, 1);
          let first = parseInt(myJSON);
          if (this.page > first) this.page -= 1;
        })
        .catch(error => {
          this.joueurData = "Pas de données";
        });
    },
    afficherPageSuiv() {
      this.joueurData = [];
      axios
        .get("http://localhost:19080/joueurs?page=" + (this.page + 1))
        .then(response => {
          response.data.joueurs.forEach(j => {
            this.joueurData.push({
              Joueur: j.joueur.pseudo,
              Mail: j.joueur.mail
            });
          });
          let obj = response.data.links.last;
          let myJSON = JSON.stringify(obj)
            .slice(24)
            .slice(0, 1);
          let last = parseInt(myJSON);
          if (this.page < last) this.page += 1;
        })
        .catch(error => {
          this.joueurData = "Pas de données";
        });
    }
  }
};
</script>