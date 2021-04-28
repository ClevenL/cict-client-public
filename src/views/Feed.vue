<template>
  <sidebar-feed></sidebar-feed>
  <div class="flex flex-col flex-1">
    <header-nav></header-nav>
    <main class="h-full overflow-y-auto">
      <!-- Article Feed Item -->
      <div v-if="!articleModal">
        <div 
        class="max-w-3xl px-8 py-4 mx-auto my-2 bg-white shadow-md transition-colors duration-150 hover:bg-gray-100 dark:bg-gray-800"
        v-for="(item) in filteredArticles" :key="item._id"
        @click="getArticleModal(item)"
        >
          <div class="mt-2">
            <h2 class="text-2xl font-bold text-gray-700 dark:text-white">{{ item.title }}</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">{{ printSummary(item) }}</p>
          </div>
          
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center">
              <img class="w-5 h-5 mr-4 rounded-full"
              :src="getSourceFaviconURL(item)" />
              <p class="font-bold text-gray-500 dark:text-gray-200">{{ item.sources.title }}</p>
            </div>
            <div class="flex items-center">
              <span v-if="!item.read" class="px-2 py-1 text-sm font-bold text-white bg-yellow-400 rounded-full">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                </span>
              <svg 
                v-if="item.star"
                class="w-5 h-5 text-yellow-500"
                viewBox="0 0 20 20" 
                fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p class="w-16 text-right text-gray-600 dark:text-blue-400">{{ getFeedDate(item)}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Article Modal -->
      <div v-if="articleModal">
        <nav class="bg-gray-50 dark:bg-gray-800">
          <div class="container px-6 py-3 mx-auto">
            <div class="flex items-center justify-between">
              <div @click="closeArticleModal" class="transition-colors text-gray-500 duration-150 hover:text-gray-800 flex items-center justify-between">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              </div>
              <div class="flex-1 flex items-center md:justify-between">
                <div class="flex flex-row items-center mx-20">
                  <div class="flex items-center">
                    <img class="w-5 h-5 mr-2"
                    :src="getSourceFaviconURL(modalItem)" />
                    <p class="text-sm text-gray-500 dark:text-gray-200">{{ modalItem.sources.title }}</p>
                  </div>
                </div>
                <div class="flex items-center mt-4 md:mt-0">
                  <button 
                  @click="isRead(modalItem) ? makeUnRead(modalItem) : makeRead(modalItem)"
                  class="hidden mx-4 text-gray-500 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <span class="px-2 py-1 text-sm font-bold text-white bg-yellow-400 rounded-lg">{{ isRead(modalItem) ? "Read" : "Unread" }}</span>
                  </button>
                  <button 
                  v-if="!isStarred(modalItem)"
                  @click="makeStarred(modalItem)"
                  class="hidden mx-4 text-gray-500 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <button 
                  v-if="isStarred(modalItem)"
                  @click="makeUnStarred(modalItem)"
                  class="hidden mx-4 text-gray-500 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <svg
                      class="w-5 h-5 text-yellow-500"
                      viewBox="0 0 20 20" 
                      fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <a v-bind:href="prettyURL(modalItem)" target="_blank" class="hidden mx-4 text-gray-500 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                  <button @click="hideFromModal(modalItem)" class="hidden mx-4 text-gray-500 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                  <button class="hidden mx-4 text-gray-500 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div 
        class="max-w-3xl px-8 py-4 mx-auto my-2 bg-white shadow-md dark:bg-gray-800"
        >
          <div class="mt-2">
            <h2 class="text-2xl font-bold text-gray-700">{{ modalItem.title }}</h2>
            <p class="mt-2 text-gray-600">{{ modalItem.date }}</p>
            <img v-if="articleContentLoader" src="../assets/buratino.png" class="block animate-spin h-20 w-20" style="margin-right:auto; margin-left:auto;"/>
            <p class="modal-content mt-2 text-gray-600" v-html="modalItem.content"></p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarFeed from "../components/SidebarFeed.vue"
import HeaderNav from "../components/HeaderNav.vue"
import api from '../api/'
import utils from '../utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Feed",
  components: {
    "sidebar-feed": SidebarFeed,
    "header-nav": HeaderNav,
  },
  data() {
    return {
      articleModal: false,
      modalItem: {},
      articleContentLoader: false,
    };
  },
  computed: {
    ...mapGetters([
      'filteredArticles',
      'activeCollection',
      'entriesInCollection',
      'unHiddenArticles',
    ]),
  },
  methods: {
    ...mapActions([
      'makeRead',
      'makeUnRead',
      'makeStarred',
      'makeUnStarred',
      'makeHidden',
      'addEntry',
      'updateEntry',
      'updateSaved',
    ]),
    isStarred(item) {
      return this.unHiddenArticles.find(el => el._id == item._id).star  
    },
    isRead(item) { 
      return this.unHiddenArticles.find(el => el._id == item._id).read
    },
    printSummary(item) {
      return item.summary ? item.summary.replace(/(<([^>]+)>)/gi, "") : "";
    },
    prettyURL(item) {
      return item.origlink ? item.origlink : item.url;
    },
    hideFromModal(item) {
      this.makeHidden(item)
      this.closeArticleModal()
    },
    async getArticleModal(item){
      this.articleModal = true
      this.articleContentLoader = true
      Object.assign(this.modalItem, item)
      this.modalItem.date = new Date(item.date).toLocaleDateString()
      this.makeRead(item)
      this.modalItem.content = await api.getArticleContent(encodeURIComponent(utils.prettyURL(item)))
      this.articleContentLoader = false
    },
    closeArticleModal(){
      this.articleModal = false
      this.modalItem = {}
    },
    getFeedDate(item){
      const ms = Date.now() - new Date(item.date)
      const hours = Math.floor(ms/3600000)
      const minutes = Math.floor(ms/60000)    
      if(minutes < 1) return `now`
      if(minutes < 60) return `${minutes}min`
      return hours < 24 ? `${hours}h` : `${Math.floor(hours/24)}d`
    },
    getSourceFaviconURL(item){
      return `https://www.google.com/s2/favicons?domain=${utils.prettyURL(item)}`
    },
    async addNewEntry(item) {
      let newEntry = {}
      Object.assign(newEntry, item)
      delete newEntry.content
      await this.addEntry({
        title: newEntry.title,
        articles: [newEntry],
        article_urls: [utils.prettyURL(item)],
        collection_id: this.activeCollection._id
      })
      this.hideFromModal(item)
      this.$store.dispatch('loadEntries')
    },
    async updateFeedEntry(item, entry) {
      delete item.content
      entry.articles.push(item)
      entry.article_urls.push(utils.prettyURL(item))
      await this.updateEntry(entry)
      this.hideFromModal(item)
      this.$store.dispatch('loadEntries')
    },
  },
};
</script>

<style>
.modal-content a:link{
  text-decoration: underline;
  font-weight: 500;
}
.modal-content p{
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
}
.modal-content h2{
  font-size: 130%;
  color: #374151;
  font-weight: 500;
}
.modal-content strong{
  display: inline-block;
  font-size: 130%;
  line-height: 1;
}
.modal-content code{
  font-family: monospace;
}
.modal-content pre{
  overflow: auto;
  background-color: #ffffff;
  border: 1px solid #898989;
  padding: 5px;
  margin: 1em 0;
}

</style>