<template>
  <div>
    <NavBar/>
    <b-card bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        label="Ajouter une série :"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <b-form-group
          class="w-50"
          label-cols-sm="2"
          label="Ville:"
          label-align-sm="right"
          label-for="desc"
        >
          <b-form-input id="desc" v-model="ville"></b-form-input>
        </b-form-group>
      </b-form-group>
      <b-button v-if="pos" v-on:click="ajoutSerie" class="btn btn-primary m-t-20">Ajouter une série</b-button>
      <b-alert
      v-if="ok"
      :show="dismissCountDown"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      dismissible
      class="w-25 mx-auto h-25 mt-3"
      variant="success"
    >
    <p>Série ajoutée avec succès</p>
    </b-alert>
    </b-card>
    <Gmap-autocomplete class="mt-3 w-50" @place_changed="setPlace"></Gmap-autocomplete>
    <b-button pill variant="info" @click="getCoordonnees">Récupérer les Coordonnées</b-button>
    <GmapMap class="mx-auto mt-3" :center="center" :zoom="12" style="width: 1000px; height: 500px">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from './Navbar'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      center: { lat: 48.6865674, lng: 6.1909025 },
      markers: [],
      places: [],
      ville: "",
      pos: false,
      token: "dqlsjfjqlf",
      lat: null,
      long: null,
      ok:false,
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    ajoutSerie() {
      axios
        .post(
          "http://localhost:19080/series",
          {
            ville: this.ville,
            lat: this.lat,
            long: this.long,
            dist: 10,
            zoom: 10
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$route.params.props.token
            }
          }
        )
        .then(response => {
            this.ok = true;
          console.log(response.data);
          console.log("bravo");
        })
        .catch(err => {
          console.log("ntm");
        });
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    getCoordonnees() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.lat = this.currentPlace.geometry.location.lat()
        this.long = this.currentPlace.geometry.location.lng()
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        this.pos = true;
        this.coord = true;
        this.dismissCountDown = this.dismissSecs;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>