const state = {
    feedMenuState: "All articles",
    settingsMenuState: "General",
}

const getters = {
    feedMenuState: (state) => {
        return state.feedMenuState
    },
    settingsMenuState: (state) => {
        return state.settingsMenuState
    }
}

const actions = {
    async changeFeedMenuState ({ commit }, data) {
        commit('CHANGE_FEED_MENU_STATE', data)
    },
    async changeSettingsMenuState ({ commit }, data) {
        commit('CHANGE_SETTINGS_MENU_STATE', data)
    },
}

const mutations = {
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