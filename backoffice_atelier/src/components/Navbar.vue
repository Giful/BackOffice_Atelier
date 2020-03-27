 <template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" v-if="$route.params.props.connected">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="$route.params.props.admin">
          <b-nav-item-dropdown href="#" text="Joueurs">
            <b-dropdown-item>
              <router-link
                :to="{ name: 'joueurs', params:{ props:{connected:true, admin:true, token: this.$route.params.props.token} } }"
                class="black"
              >Afficher tous les joueurs</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link
                :to="{ name: 'joueursId', params:{id : checkIDJ, props:{connected:true, admin:true, token: this.$route.params.props.token} } }"
                class="black"
              >Afficher un joueur selon son ID</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown href="#" text="Parties">
            <b-dropdown-item>
              <router-link
                :to="{ name: 'Parties', params:{ props:{connected:true, admin:true, token: this.$route.params.props.token} } }"
                class="black"
              >Afficher toutes les parties</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link
                :to="{ name: 'partieId', params:{id : checkIDP, props:{connected:true, admin:true, token: this.$route.params.props.token} } }"
                class="black"
              >Afficher une partie selon son ID</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link
                :to="{ name: 'joueurParties', params:{id : checkIDJ, props:{connected:true, admin:true, token: this.$route.params.props.token} } }"
                class="black"
              >Afficher les parties d'un seul joueur</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
            <router-link
              class="white"
              :to="{ name: 'Photo', params:{ props:{connected:true, admin:true, token: this.$route.params.props.token} } }"
            >Ajouter une photo</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="white"
              :to="{ name: 'Serie', params:{ props:{connected:true, admin:true, token: this.$route.params.props.token} } }"
            >Ajouter une série</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else>
          <b-nav-item>
            <router-link
              class="white"
              :to="{ name: 'Photo', params:{ props:{connected:true, token: this.$route.params.props.token} } }"
            >Ajouter une photo</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="white"
              :to="{ name: 'Serie', params:{ props:{connected:true, token: this.$route.params.props.token} } }"
            >Ajouter une série</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button v-on:click="deconnect" variant="danger">Déconnexion</b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["connected"],
  data() {
    return {
      checkIDJ: 1,
      checkIDP: 1
    };
  },
  methods: {
    deconnect() {
      this.$router.push("/", { props: { connected: false } });
      this.mail = "";
      this.pwd = "";
    }
  }
};
</script>
        