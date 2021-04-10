import api from '../../api/'
import Fuse from 'fuse.js'

const state = {
    articles: [],
    type: 'all',
    search: '',
    selectedSources: [],
    //category: null,

}

const filters = {
    //search: (articles, search) => articles.filter(article => article.articles.title.match(search)),
    unread: articles => articles.filter(article => !article.read && !article.hide),
    read: articles => articles.filter(article => article.read && !article.hide),
    starred: articles => articles.filter(article => article.star && !article.hide),
    //source: (articles, source) => articles.filter(article => article.sources._id === source._id),
    //category: (articles, category) => articles.filter(article => article.articles.category === category),
    saved: articles => articles.filter(article => article.save && !article.hide),
    all: articles => articles.filter(article => !article.hide)
}

const searchOption = {
    minMatchCharLength: 2,
    isCaseSensitive: false,
    shouldSort: true,
    findAllMatches: true,
    includeScore: true,
    threshold: 0.5,
    keys: ['title', 'summary']
}

const getters = {
    filteredArticles: (state) => {
        if (state.selectedSources.length && !state.search.length) 
            return filters[state.type](state.articles).filter(article => state.selectedSources.some(title => title == article.sources.title))
        if (state.search.length && !state.selectedSources.length) {
            const searchIndex = Fuse.createIndex(searchOption.keys, state.articles)
            const fuse = new Fuse(state.articles, searchOption, searchIndex)
            return filters[state.type](fuse.search(state.search).map(article => article.item))
        }
        if (state.search.length && state.selectedSources.length) {
            const searchIndex = Fuse.createIndex(searchOption.keys, state.articles)
            const fuse = new Fuse(state.articles, searchOption, searchIndex)
            return filters[state.type](fuse.search(state.search).map(article => article.item)).filter(article => state.selectedSources.some(title => title == article.sources.title))
        }
        return filters[state.type](state.articles)

        /*
        const sortPref = rootState.Setting.oldestArticles === 'off' ? 'desc' : 'asc'
        const orderedArticles = state.articles.concat().sort(sortBy('publishUnix', sortPref))
        if (state.type !== 'feed' && state.type !== 'search') {
          return filters[state.type](orderedArticles)
        }
        if (state.type === 'search') {
          const searchIndex = Fuse.createIndex(searchOption.keys, state.articles)
          const fuse = new Fuse(state.articles, searchOption, searchIndex)
          if (state.search !== '') {
            return fuse.search(state.search).map(article => article.item)
          }
          return filters.all(orderedArticles)
        }
        if (state.category) {
          return filters.category(orderedArticles, state.category)
        }
        return filters[state.type](orderedArticles, state.feed)
        */
    },
    unHiddenArticles: (state) => {
        return state.articles.filter(article => !article.hide)
    },
    unReadArticles: (state) => {
        return state.articles.filter(article => !article.hide && !article.read)
    },
    selectedSources: (state) => {
        return state.selectedSources
    }
}

const actions = {
    async loadArticles ({ commit }) {
        commit('LOAD_ARTICLES', await api.getAllArticles())
    },
    async makeRead ({ commit }, data) {
        commit('UPDATE_ARTICLE_DATA', await api.updateArticleRead(data, true))
    },
    async makeUnRead ({ commit }, data) {
        commit('UPDATE_ARTICLE_DATA', await api.updateArticleRead(data, false))
    },
    async makeStarred ({ commit }, data) {
        commit('UPDATE_ARTICLE_DATA', await api.updateArticleStar(data, true))
    },
    async makeUnStarred ({ commit }, data) {
        commit('UPDATE_ARTICLE_DATA', await api.updateArticleStar(data, false))
    },
    async makeHidden ({ commit }, data) {
        commit('UPDATE_ARTICLE_DATA', await api.updateArticleHide(data, true))
    },
    async updateSaved ({ commit }, data) {
        commit('UPDATE_ARTICLE_DATA', await api.updateArticleSave(data))
    },
    updateType ({ commit }, data) {
        commit('UPDATE_TYPE', data)
    },
    updateSearch ({ commit }, data) {
        commit('UPDATE_SEARCH', data)
    },
    selectSource ({ commit }, data) {
        commit('SELECT_SOURCE', data)
    },
}

const mutations = {
    LOAD_ARTICLES (state, data) {
        state.articles = data
    },
    UPDATE_ARTICLE_DATA (state, data) {
        const index = state.articles.findIndex(item => item._id === data._id)
        state.articles[index] = data
    },
    UPDATE_TYPE (state, data) {
        state.type = data
    },
    UPDATE_SEARCH (state, data) {
        state.search = data
    },
    SELECT_SOURCE (state, data) {
        const index = state.selectedSources.findIndex(sSource => sSource == data.title)
        if (index >= 0) state.selectedSources.splice(index, 1)
        if (index < 0) state.selectedSources.push(data.title)
    }

}

export default {
  state,
  getters,
  actions,
  mutations
}