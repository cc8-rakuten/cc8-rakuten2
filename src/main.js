import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
