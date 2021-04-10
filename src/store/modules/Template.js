import api from '../../api'

const state = {
    templates: []
}

const getters = {
    categories: (state) => {
        return state.templates[0].categories
    },
    template: (state) => {
        return state.templates[0]
    }
}

const actions = {
    async loadTemplates({ commit }) {
        commit('LOAD_TEMPLATES', await api.getAllTemplates())
    },
    async updateTemplateCategories({ commit }, data) {
        const request = {
            categories: data.categories
        }
        commit('UPDATE_TEMPLATE_CATEGORIES', await api.updateTemplate(data, request))
    },
}

const mutations = {
    LOAD_TEMPLATES (state, data) {
        state.templates = data
    },
    UPDATE_TEMPLATE_CATEGORIES (state, data) {
        state.templates[0] = data
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}