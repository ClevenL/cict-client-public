import api from '../../api'

const state = {
    entries: []
}

const getters = {
    entriesInCollection: (state, rootGetters) => {
        return state.entries.filter(entry => entry.collection_id == rootGetters.activeCollection._id)
    },
    entriesInCollectionCategorized: (state, rootGetters) => {
        let result = {}
        rootGetters.categories.forEach(category => {
            result[category.arrayName] = rootGetters.entriesInCollection.filter(entry => entry.category == category.title)
        })
        return result
    }
}

const actions = {
    async loadEntries ({ commit }) {
        commit('LOAD_ENTRIES', await api.getAllEntries())
    },
    async addEntry ({ commit }, data) {
        commit('ADD_ENTRY', await api.addEntry(data))
    },
    async updateEntry ({ commit }, data) {
        const request = {
            title: data.title,
            description: data.description,
            articles: data.articles,
            article_urls: data.article_urls,
            category: data.category
        }
        commit('UPDATE_ENTRY', await api.updateEntry(data, request))
    },
    async deleteEntry ({dispatch}, data) {
        await api.deleteEntry(data)
        await dispatch('loadEntries')
    }
}

const mutations = {
    LOAD_ENTRIES (state, data) {
        state.entries = data
    },
    ADD_ENTRY (state, data) {
        state.entries.unshift(data)
    },
    UPDATE_ENTRY (state, data) {
        const index = state.entries.findIndex(item => item._id === data._id)
        state.entries[index] = data
    },

}

export default {
  state,
  getters,
  actions,
  mutations
}