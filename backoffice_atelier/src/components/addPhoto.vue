<template>
  <div>
    <NavBar />
    <b-card bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        label="Ajouter une photo :"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <b-form-group
          class="w-75"
          label-cols-sm="2"
          label="Description:"
          label-align-sm="right"
          label-for="desc"
        >
          <b-form-input id="desc" v-model="description"></b-form-input>
        </b-form-group>

        <b-form-group class="w-75" label-cols-sm="2" label-align-sm="right" label="Choisissez une série:" label-for="ville">
          <b-form-select v-model="selected" :options="tabSerie"></b-form-select>
        </b-form-group>
        <b-form-group class="w-75" label-cols-sm="2" label-align-sm="right" label="Url de la photo:" label-for="sel">
          <b-form-select id="sel" v-model="select" :options="options" class="w-25"></b-form-select>
          <b-form-input v-if="bool" id="url" v-model="urlImage" class="w-75 mx-auto mt-2" placeholder="Url de l'image"></b-form-input>
          <b-form-file v-else v-model="urlImage" class="w-50"></b-form-file> 
        </b-form-group>
      </b-form-group>
      <b-button
        pill
        variant="info"
        v-if="pos"
        @click="ajoutPhoto"
        text="Valider"
        class="btn btn-primary m-t-20"
      >Ajouter photo</b-button>
      <b-alert
        v-if="add"
        :show="dismissCount"
        @dismissed="dismissCount=0"
        @dismiss-count-down="countDown"
        class="w-25 mx-auto h-25 mt-3"
        variant="success"
      >
        <p>Photo ajoutée avec succès</p>
      </b-alert>
      <b-alert
        v-else
        :show="dismissCount"
        @dismissed="dismissCount=0"
        @dismiss-count-down="countDown"
        class="w-25 mx-auto h-25 mt-3"
        variant="danger"
      >
        <p>Erreur lors de l'ajout de la photo veuillez réessayer</p>
      </b-alert>
    </b-card>
    <Gmap-autocomplete class="mt-3 w-50" @place_changed="setPlace"></Gmap-autocomplete>
    <b-button pill variant="info" @click="getCoordonnees">Récupérer les Coordonnées</b-button>
    <b-alert
      v-if="coord"
      :show="dismissCountDown"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      class="w-25 mx-auto h-25 mt-3"
      variant="success"
    >
      <p>Coordonnées récupérées avec succès</p>
    </b-alert>
    <GmapMap
      class="mx-auto mt-3"
      :center="center"
      :zoom="zoom"
      style="width: 1000px; height: 500px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import NavBar from "./Navbar";
export default {
  name: "addPhoto",
  components: {
    NavBar
  },
  data() {
    return {
      options: [
        { value: 0, text: "Importer une url" },
        { value: 1, text: "Importer une photo", disabled: true }
      ],
      selected: 0,
      select: 0,
      bool: true,
      dismissSecs: 3,
      dismissCountDown: 0,
      dismissCount: 0,
      center: { lat: 48.6865674, lng: 6.1909025 },
      markers: [],
      places: [],
      series: [],
      tabSerie: [],
      currentPlace: null,
      token: "fdjsfnsdjkfjsknfs",
      apiKey: "c60f5bc20e88fc9343e7e9b8335fa93e",
      description: "",
      urlImage: null,
      pos: false,
      coord: false,
      add: false,
      zoom: 5,
      file_path: "",
      task: null,

      bodyData: null
    };
  },
  watch: {
    select: function() {
      if (this.bool) {
        this.bool = false;
        this.urlImage = "";
      } else {
        this.bool = true;
        this.urlImage = null;
      }
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    ajoutPhoto() {
      axios
        .post(
          "http://docketu.iutnc.univ-lorraine.fr:60080/photos",
          {
            descr: this.description,
            url: this.urlImage,
            lat: this.center.lat,
            lng: this.center.lng,
            refSerie: this.selected
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$route.params.props.token
            }
          }
        )
        .then(response => {
          this.dismissCount = this.dismissSecs;
          this.add = true;
        })
        .catch(err => {});
    },
    /* pushToImgBB() {
      this.file_name =
        "https://blog-fr.orson.io/wp-content/uploads/2017/06/jpeg-ou-png.jpg";
      this.bodyData = new FormData();
      this.bodyData.append("image", this.file_name);
      axios({
        method: "post",
        url: "https://api.imgbb.com/1/image?key=" + this.apiKey,
        headers: this.bodyData.getHeaders(),
        data: this.bodyData
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, */
    setPlace(place) {
      this.currentPlace = place;
    },
    getCoordonnees() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        this.pos = true;
        this.coord = true;
        this.zoom = 12;
        this.dismissCountDown = this.dismissSecs;
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    countDown(dismissCount) {
      this.dismissCount = dismissCount;
    }
  },
  created: function() {
    axios
      .get("http://localhost:19080/series", {
        headers: {
          Authorization: "Bearer " + this.$route.params.props.token
        }
      })
      .then(response => {
        response.data.series.forEach(s => {
          this.tabSerie.push({ value: s.serie.idSerie, text: s.serie.ville });
        });
      })
      .catch(err => {});
  }
};
</script>