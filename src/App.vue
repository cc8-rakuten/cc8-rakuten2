<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Take a week off with friends!</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-form>
        <v-layout row wrap>
          <vuetify-google-autocomplete
            id="map"
            label="Where to?"
            placeholder="Dreamland"
            v-on:placechanged="getDestinationData"
            types="(cities)"
          ></vuetify-google-autocomplete>

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
      <StartScreen v-if="this.$store.state.submittedStatus === 0"/>
      <LoadingScreen v-if="this.$store.state.submittedStatus === 1"/>
      <ResultScreen v-if="this.$store.state.submittedStatus > 1"/>
    </v-content>
  </v-app>
</template>

<script>
import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import ResultScreen from "./components/ResultScreen";
import Axios from "axios";

export default {
  name: "App",
  components: {
    StartScreen,
    ResultScreen,
    LoadingScreen
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      destination: "",
      source: {}
    };
  },

  methods: {
    getTripData: async function() {
      this.$store.commit("setLoadingStatus");
      const response = await Axios({
        method: "post",
        url: "/api/travel",
        data: {
          date: this.date,
          destination: this.destination
        }
      });
      // receive to/from and to/fromAirport
      this.$store.commit("setTravelIdea", response.data);
      const responseTwo = await Axios({
        method: "post",
        url: "/api/flights",
        data: {
          date: this.date,
          fromAirport: this.$store.state.tripPlan.fromAirport,
          toAirport: this.$store.state.tripPlan.toAirport
        }
      });
      this.$store.commit("setFlightData", responseTwo.data);
    },
    getDestinationData: function(e) {
      this.destination = e;
    }
  }
};
</script>
