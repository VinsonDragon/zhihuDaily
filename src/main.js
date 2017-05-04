import Vue from 'vue';
import Vuex from 'vuex';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import App from './App';
import router from './router';
import pacman from './components/pacman';
import scroll from './components/scroll';

Vue.use(Vuex);
Vue.use(VueAwesomeSwiper);
Vue.component(pacman.name, pacman);
Vue.component(scroll.name, scroll);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    drawer: false,
    num: 1,
    top: false,
  },
  mutations: {
    changeNum: (state, n) => state.num = n,
    topShow(state, n) {
      if (n) {
        state.top = true
      } else {
        state.top = false
      }
    },
    back(state, n) {
      if (n) {
        state.drawer = false
      } else {
        state.drawer = true
      }
    },
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  ...App
});

router.beforeEach((to, from, next) => {
  if (to.path == '/content') {
    store.commit('back');
  } else {
    store.commit('back', 1);
  }
  store.commit('topShow');
  next()
});
