<template>
  <sidebar-feed></sidebar-feed>
  <div class="flex flex-col flex-1">
    <header-nav></header-nav>
    <main class="h-full overflow-y-auto">
      <article-modal v-if="articleModal"></article-modal>
      <div v-if="!articleModal">
        <div
          class="max-w-3xl px-8 py-4 mx-auto my-2 bg-white shadow-md transition-colors duration-150 hover:bg-gray-100 dark:bg-gray-800"
          v-for="item in filteredArticles"
          :key="item._id"
          @click="setArticleModal(item)"
        >
          <div class="mt-2">
            <h2 class="text-2xl font-bold text-gray-700 dark:text-white">
              {{ item.title }}
            </h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">
              {{ printSummary(item) }}
            </p>
          </div>

          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center">
              <img
                class="w-5 h-5 mr-4 rounded-full"
                :src="getSourceFaviconURL(item)"
              />
              <p class="font-bold text-gray-500 dark:text-gray-200">
                {{ item.sources.title }}
              </p>
            </div>
            <div class="flex items-center">
              <span
                v-if="!item.read"
                class="px-2 py-1 text-sm font-bold text-white bg-yellow-400 rounded-full"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </span>
              <svg
                v-if="item.star"
                class="w-5 h-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <p class="w-16 text-right text-gray-600 dark:text-blue-400">
                {{ getFeedDate(item) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarFeed from '../components/SidebarFeed.vue'
import HeaderNav from '../components/HeaderNav.vue'
import ArticleModal from '../components/ArticleModal.vue'
import utils from '../utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Feed',
  components: {
    'sidebar-feed': SidebarFeed,
    'header-nav': HeaderNav,
    'article-modal': ArticleModal,
  },
  computed: {
    ...mapGetters(['filteredArticles', 'activeCollection', 'articleModal']),
  },
  methods: {
    ...mapActions(['setArticleModal']),
    printSummary(item) {
      return item.summary ? item.summary.replace(/(<([^>]+)>)/gi, '') : ''
    },
    prettyURL(item) {
      return item.origlink ? item.origlink : item.url
    },
    getFeedDate(item) {
      const ms = Date.now() - new Date(item.date)
      const hours = Math.floor(ms / 3600000)
      const minutes = Math.floor(ms / 60000)
      if (minutes < 1) return `now`
      if (minutes < 60) return `${minutes}min`
      return hours < 24 ? `${hours}h` : `${Math.floor(hours / 24)}d`
    },
    getSourceFaviconURL(item) {
      return `/api/favicons/${item.sources.faviconUUID || 'placeholder'}.png`
    },
  },
}
</script>
