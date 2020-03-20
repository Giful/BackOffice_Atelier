<template>
  <div>
    <b-table striped hover :items="partiesData" :fields="fields"></b-table>
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
          key: "Score",
          sortable: false
        },
        {
          key: "NbPhotos",
          sortable: false
        },
        {
          key: "Etat",
          sortable: true
        }
      ],
      partiesData: [],
      page: 1,
      pageMax: "",
      pageMin: ""
    };
  },
  created: function() {
    axios
      .get("http://localhost:19080/parties?page=" + this.page)
      .then(response => {
        response.data.parties.forEach(p => {
          this.partiesData.push({
            Score: p.partie.score,
            NbPhotos: p.partie.nb_photos,
            Etat: p.partie.statut
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
        this.partiesData = [];
      });
  },
  methods: {
    afficherPagePrec() {
      this.partiesData = [];
      axios
        .get("http://localhost:19080/parties?page=" + (this.page - 1))
        .then(response => {
        response.data.parties.forEach(p => {
          this.partiesData.push({
            Score: p.partie.score,
            NbPhotos: p.partie.nb_photos,
            Etat: p.partie.statut
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
          this.partiesData = "Pas de données";
        });
    },
    afficherPageSuiv() {
      this.partiesData = [];
      axios
        .get("http://localhost:19080/parties?page=" + (this.page + 1))
        .then(response => {
        response.data.parties.forEach(p => {
          this.partiesData.push({
            Score: p.partie.score,
            NbPhotos: p.partie.nb_photos,
            Etat: p.partie.statut
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
          this.partiesData = "Pas de données";
        });
    }
  }
};
</script>