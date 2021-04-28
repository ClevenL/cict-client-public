const state = {
    feedMenuState: "All articles",
    settingsMenuState: "General",
    allDataLoaded: false,
}

const getters = {
    allDataLoaded: (state) => {
        return state.allDataLoaded
    },
    feedMenuState: (state) => {
        return state.feedMenuState
    },
    settingsMenuState: (state) => {
        return state.settingsMenuState
    }
}

const actions = {
    async loadAllData ({ dispatch, commit }) {
        dispatch('loadArticles', { root: true })
        dispatch('loadCollections', { root: true })
        dispatch('loadEntries', { root: true })
        dispatch('loadTemplates', { root: true })
        dispatch('loadSources', { root: true })
        commit('UPDATE_ALL_DATA_LOADED', true)
    },
    async updateAllDataLoaded ({ commit }, data) {
        commit('UPDATE_ALL_DATA_LOADED', data)
    },
    async changeFeedMenuState ({ commit }, data) {
        commit('CHANGE_FEED_MENU_STATE', data)
    },
    async changeSettingsMenuState ({ commit }, data) {
        commit('CHANGE_SETTINGS_MENU_STATE', data)
    },
}

const mutations = {
    UPDATE_ALL_DATA_LOADED (state, data) {
        state.allDataLoaded = data
    },
    CHANGE_FEED_MENU_STATE (state, data) {
        state.feedMenuState = data
    },
    CHANGE_SETTINGS_MENU_STATE (state, data) {
        state.settingsMenuState = data
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}