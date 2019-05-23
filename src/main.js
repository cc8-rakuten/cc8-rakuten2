import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import flights from "../data/flights.json";

import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: "AIzaSyAn19RJD6FC5aLwzr0AbsmzP4rmQjoJENU",
  language: "en"
});

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    submittedStatus: false,
    flightsInfo: flights,
    tripPlan: {
      from: "Tokyo",
      destination: "Paris",
      fromAirport: "NRT",
      toAirport: "CDG",
      flight: {
        airportSummary1: "NRT to CDG",
        airportSummary2: "CDG to NRT",
        price: 0
      },
      pictureURL: "https://media.giphy.com/media/vQBkSwVkEZfTq/giphy.gif"
    }
  },
  mutations: {
    setTravelIdea(state, newTravelIdea) {
      console.log(state.flightsInfo);
      state.submittedStatus = true;
      state.tripPlan.from = newTravelIdea.from;
      state.tripPlan.to = newTravelIdea.to;
      state.tripPlan.fromAirport = newTravelIdea.fromAirport;
      state.tripPlan.toAirport = newTravelIdea.toAirport;
      // state.tripPlan.pictureURL = newTravelIdea.pictureURL;
    },
    setFlightData(state, flights) {
      state.tripPlan.flight.airportSummary1 = flights.airportSummary1;
      state.tripPlan.flight.airportSummary2 = flights.airportSummary2;
      state.tripPlan.flight.price = flights.price;
    }
  },
  getters: {
    from: state => state.tripPlan.from,
    destination: state => state.tripPlan.destination,
    fromAirport: state => state.tripPlan.fromAirport,
    toAirport: state => state.tripPlan.toAirport,
    airportSummary1: state => state.tripPlan.flight.airportSummary1,
    airportSummary2: state => state.tripPlan.flight.airportSummary2,
    price: state => state.tripPlan.flight.price
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
