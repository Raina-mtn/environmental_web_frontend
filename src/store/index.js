import Vue from 'vue';
import Vuex from 'vuex';
import tagsView from './modules/tagsView'
import station from './modules/station'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fontSize: 0,
  },
  mutations: {
    SET_FONTSIZE(state, fontSize){
      state.fontSize = fontSize
    },
  },
  actions: {
  },
  modules: {
    tagsView,
    station
  },
  plugins: [
    createPersistedState({
      key: 'station',
      paths: ['station']
    })
  ]
});
