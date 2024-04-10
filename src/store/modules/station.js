const state = {
  station:{},
  stationList:[],
}

const mutations = {
  SET_STATION: (state, station) => {
    state.station = station
  },
  SET_STATIONLIST: (state, stationList) => {
    state.stationList = stationList
  },
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
