import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username:'',
    userId:'',
    token:''
  },
  mutations: {
    setUsername (state, value) {
      state.username = value
    },
    setUserId (state, value) {
      state.userId = value
    },
    setToken (state, value) {
      state.token = value
    },
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
