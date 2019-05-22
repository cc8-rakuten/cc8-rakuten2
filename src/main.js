import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import flights from "../data/flights.json";

import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import { from } from "rxjs";

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
    travelIdea: {}
  },
  mutations: {
    setTravelIdea(state, newTravelIdea) {
      console.log(state.flightsInfo);
      state.travelIdea = newTravelIdea;
      state.submittedStatus = true;
    }
  }
});

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
