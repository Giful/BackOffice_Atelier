// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import BootstrapVue from "bootstrap-vue"

import Homepage from './components/Homepage'
import Joueurs from './components/Joueurs'
import JoueurId from './components/JoueurId'
import Parties from './components/Parties'
import PartieId from './components/PartieId'
import JoueurParties from './components/JoueurParties'
import addPhoto from './components/addPhoto'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter ({
  mode : 'history',

  routes: [
    { path: '/', component : Homepage },
    { path: '/joueurs', component : Joueurs},
    { path: '/joueur/:id', component : JoueurId}, 
    { path: '/parties', component : Parties },
    { path: '/partie/:id', component : PartieId},
    { path: '/joueur/:id/parties', component : JoueurParties },
    { path: '/addPhoto', component : addPhoto}
  ]
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
