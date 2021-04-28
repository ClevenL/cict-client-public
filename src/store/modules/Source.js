import api from '../../api'

const state = {
    sources: [],
    sourceAddingError: false
}

const getters = {
    sources: (state) => {
        return state.sources
    },
    sourceAddingError: (state) => {
        return state.sourceAddingError
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
        commit('UPDATE_SOURCE_ADDING_ERROR', false)
        const response = await api.addSource(data)
        response.title ? commit('ADD_SOURCE', response) : commit('UPDATE_SOURCE_ADDING_ERROR', true)
    },
    async makeSourceActive ({ commit }, data) {
        commit('UPDATE_SOURCE', await api.updateSourceActive(data, true))
    },
    async makeSourceInActive ({ commit }, data) {
        commit('UPDATE_SOURCE', await api.updateSourceActive(data, false))
    },
    async updateSource ({ commit }, data) {
        const request = {
            title: data.title
        }
        commit('UPDATE_SOURCE', await api.updateSource(data, request))
    },
    async deleteSource ({dispatch}, data) {
        await api.deleteSource(data)
        await dispatch('loadSources')
    },
    async updateSourceAddingError ({ commit }, data) {
        commit('UPDATE_SOURCE_ADDING_ERROR', data)
    },
}

const mutations = {
    LOAD_SOURCES (state, data) {
        state.sources = data
    },
    ADD_SOURCE (state, data) {
        state.sources.unshift(data)
    },
    UPDATE_SOURCE_ADDING_ERROR (state, data) {
        state.sourceAddingError = data
    },
    UPDATE_SOURCE (state, data) {
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