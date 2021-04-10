import api from '../../api'

const state = {
    collections: []

}

const getters = {
    activeCollection: (state) => {
        return state.collections.find(col => col.active == true)
    },
    collections: (state) => {
        return state.collections
    }
}

const actions = {
    async loadCollections ({ commit }) {
        commit('LOAD_COLLECTIONS', await api.getAllCollections())
    },
    async makeActive ({ commit }, data) {
        commit('UPDATE_ACTIVE', await api.updateCollectionActive(data, true))
    },
    async makeInActive ({ commit }, data) {
        commit('UPDATE_ACTIVE', await api.updateCollectionActive(data, false))
    },
    async addCollection ({ commit, dispatch }, data) {
        const response = await api.addCollection(data)
        commit('ADD_COLLECTION', response)
        dispatch('makeActive', response)
    },
    async updateCollectionData ({ commit }, data) {
        const request = {
            title: data.title,
            date_field: data.date_field
        }
        commit('UPDATE_COLLECTION_DATA', await api.updateCollectionData(data, request))
    },
    async deleteCollection ({dispatch}, data) {
        await api.deleteCollection(data)
        await dispatch('loadCollections')
    }

}

const mutations = {
    LOAD_COLLECTIONS (state, data) {
        state.collections = data
    },
    UPDATE_ACTIVE (state, data) {
        const index = state.collections.findIndex(item => item._id === data._id)
        state.collections[index] = data
    },
    ADD_COLLECTION (state, data) {
        state.collections.unshift(data)
    },
    UPDATE_COLLECTION_DATA (state, data) {
        const index = state.collections.findIndex(item => item._id === data._id)
        state.collections[index] = data
    },

}

export default {
  state,
  getters,
  actions,
  mutations
}