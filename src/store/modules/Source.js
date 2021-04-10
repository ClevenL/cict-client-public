import api from '../../api'

const state = {
    sources: []
}

const getters = {
    sources: (state) => {
        return state.sources
    },
    activeSources: (state) => {
        return state.sources.filter(source => source.active)
    }
}


const actions = {
    async loadSources ({ commit }) {
        commit('LOAD_SOURCES', await api.getAllSources())
    },
    async addSource ({commit}, data) {
        const response = await api.addSource(data)
        if (response.title) {
            commit('ADD_SOURCE', response)
            return true
        } else {
            return false
        }
    },
    async makeSourceActive ({ commit }, data) {
        commit('UPDATE_SOURCE_ACTIVE', await api.updateSourceActive(data, true))
    },
    async makeSourceInActive ({ commit }, data) {
        commit('UPDATE_SOURCE_ACTIVE', await api.updateSourceActive(data, false))
    },
}

const mutations = {
    LOAD_SOURCES (state, data) {
        state.sources = data
    },
    ADD_SOURCE (state, data) {
        state.sources.unshift(data)
    },
    UPDATE_SOURCE_ACTIVE (state, data) {
        const index = state.sources.findIndex(item => item._id === data._id)
        state.sources[index] = data
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}