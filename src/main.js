import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import VueLocalStorage from "vue-localstorage";

window.aria2 = undefined;

Vue.use(Vuetify);
Vue.use(VueLocalStorage, {
  name: 'localStorage',
  bind: true //created computed members from your variable declarations
});

new Vue({
  el: "#app",
  render: h => h(App)
});
