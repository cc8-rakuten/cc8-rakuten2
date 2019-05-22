import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyAn19RJD6FC5aLwzr0AbsmzP4rmQjoJENU'
});

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    submittedStatus: false,
    travelIdea: {}
  },
  mutations: {
    setTravelIdea(state, newTravelIdea) {
      state.travelIdea = newTravelIdea;
      state.submittedStatus = true;
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')