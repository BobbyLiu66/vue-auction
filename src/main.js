import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    needRefresh: false
  },
  mutations: {
    refresh(state) {
      state.needRefresh = !state.needRefresh
    }
  },
  getters: {
    refresh: (state) => {
      return state.needRefresh
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
