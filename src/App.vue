<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Take a week off with friends!</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-form>
        <v-layout row wrap>
          <v-text-field label="Where to?" placeholder="Dreamland" v-model="destination"></v-text-field>
          <v-menu
            v-model="menu"
            :close-on-content-click="true"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                prepend-icon="event"
                label="When do you leave?"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
          <v-btn @click="getTripData">Go!!</v-btn>
        </v-layout>
      </v-form>

      <v-flex></v-flex>
    </v-toolbar>

    <v-content>
      <StartScreen v-if="!this.$store.state.submittedStatus"/>
      <ResultScreen v-else/>
    </v-content>
  </v-app>
</template>

<script>
import StartScreen from "./components/StartScreen";
import ResultScreen from "./components/ResultScreen";
import Axios from "axios";

export default {
  name: "App",
  components: {
    StartScreen,
    ResultScreen
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      destination: "",
      source: {}
    };
  },
  beforeMount() {
    this.getSourceLocation();
  },
  methods: {
    getTripData: async function() {
      const response = await Axios({
        method: "post",
        url: "/api/travel",
        data: {
          date: this.date,
          destination: this.destination,
          source: this.source
        }
      });
      this.$store.commit("setTravelIdea", response.data);
    },
    getSourceLocation: function() {
      navigator.geolocation.getCurrentPosition(
        succ => {
          this.source.lat = succ.coords.latitude;
          this.source.lng = succ.coords.longitude;
        },
        err => {
          throw new Error(err);
        }
      );
    }
  }
};
</script>
