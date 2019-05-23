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
    submittedStatus: 0,
    flightsInfo: flights,
    tripPlan: {
      from: "",
      destination: "",
      fromAirport: "",
      toAirport: "",
      flight: {
        airportSummary1: "",
        airportSummary2: "",
        price: 0
      },
      pictureURL: ""
    }
  },
  mutations: {
    setLoadingStatus(state) {
      state.submittedStatus = 1;
    },
    setTravelIdea(state, newTravelIdea) {
      state.submittedStatus = 2;
      state.tripPlan.from = newTravelIdea.from;
      state.tripPlan.destination = newTravelIdea.to;
      state.tripPlan.fromAirport = newTravelIdea.fromAirport;
      state.tripPlan.toAirport = newTravelIdea.toAirport;
      state.tripPlan.pictureURL = newTravelIdea.pictureURL;
    },
    setFlightData(state, flights) {
      state.submittedStatus = 3;
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
    price: state => state.tripPlan.flight.price,
    pictureURL: state => state.tripPlan.pictureURL
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
