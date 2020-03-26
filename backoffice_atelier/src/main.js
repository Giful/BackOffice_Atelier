// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import BootstrapVue from "bootstrap-vue"
import * as VueGoogleMaps from 'vue2-google-maps'

import Homepage from './components/Homepage'
import Joueurs from './components/Joueurs'
import JoueurId from './components/JoueurId'
import Parties from './components/Parties'
import PartieId from './components/PartieId'
import JoueurParties from './components/JoueurParties'
import Photo from './components/addPhoto'
import Serie from './components/addSerie'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'





import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load:{
    key: 'AIzaSyDv6iLip5yGiu8t19TtjLzDnWHwP_HskV0',
    libraries: 'places',
  }
})

const router = new VueRouter ({
  mode : 'history',
  routes: [
    { path: '/', name:'Connexion', component : Homepage },
    { path: 'accueil', name: 'Accueil', component: Navbar},
    { path: '/joueurs', name: 'joueurs', component : Joueurs},
    { path: '/joueur/:id', name: 'joueursId', component : JoueurId}, 
    { path: '/parties', name: 'Parties', component : Parties },
    { path: '/partie/:id', name: 'partieId', component : PartieId},
    { path: '/joueur/:id/parties', name: 'joueurParties', component : JoueurParties },
    { path: '/photos', name: 'Photo', component : Photo},
    { path: '/series', name: 'Serie', component : Serie},
    { path: '/*', component : NotFound}
  ]
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
