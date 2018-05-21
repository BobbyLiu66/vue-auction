import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    needRefresh: false,
    init: true
  },
  mutations: {
    refresh(state) {
      state.needRefresh = !state.needRefresh
    },
    init(state) {
      state.init = !state.init
    }
  },
  getters: {
    refresh: (state) => {
      return state.needRefresh
    },
    init: (state)=>{
      return state.init
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
