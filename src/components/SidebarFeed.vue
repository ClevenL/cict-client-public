<template>
    <aside
        class="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block"
      >
        <div class="py-4 text-gray-500 dark:text-gray-400">
          <div class="pt-2 pb-4">
          <router-link
            class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            to="/"
          >
            CICT
          </router-link>
          </div>
          <ul>
            <!-- Searchbox -->
            <li class="relative px-6 py-3">
              <div
                class="relative w-full mr-6 focus-within:text-yellow-500"
              >
                <div class="absolute inset-y-0 flex items-center">
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  class="w-full pl-8 pr-2 text-bold text-sm text-gray-600 placeholder-gray-600 border-0 dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                  type="text"
                  v-model="search"
                  placeholder="Search articles"
                  aria-label="Search"
                  @keyup="updateSearchData"
                />
              </div>
            </li>
            <li class="relative px-6 py-1">
              <button
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeMenuState('All articles')"
              >
              <span
                class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
                v-if="feedMenuState == 'All articles'"
                ></span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                <span class="ml-4">All articles</span>
              </button>
            </li>
            <li class="relative px-6 py-1">
              <button
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeMenuState('Favourites')"
              >
                <span
                class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
                v-if="feedMenuState == 'Favourites'"
                ></span>
                <svg class= "w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span class="ml-4">Favourites</span>
              </button>
            </li>
            <li class="relative px-6 py-1">
              <button
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeMenuState('Unread articles')"
              >
                <span
                  class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                  v-if="feedMenuState == 'Unread articles'"
                ></span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="ml-4">Unread articles</span>
              </button>
            </li>
            <li class="relative px-6 py-1">
              <button
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeMenuState('Saved articles')"
              >
                <span
                  class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                  v-if="feedMenuState == 'Saved articles'"
                ></span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span class="ml-4">Saved articles</span>
              </button>
            </li>
            <hr/>
            <li class="relative px-6 py-1">
              <p class="inline-flex items-center w-full text-sm font-semibold text-gray-400">Sources</p>
            </li>
            <li class="flex relative px-6 py-1"
                v-for="source in sources" :key="source._id"
                @click="selectSource(source)"
            >
              
                <span
                  class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                  v-if="isSelectedSource(source)"
                ></span>
                <div class="w-full text-sm font-semibold text-gray-500 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    {{ source.title }}
                </div>
                <div class="justify-end w-auto text-sm font-semibold text-gray-400">
                    {{articleCountInSource(source) ? articleCountInSource(source) : ""}}
                </div>
              
            </li>
          </ul>
        </div>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "SidebarFeed",
    data () {
      return {
        search: ''
      }
    },
    computed: {
        ...mapGetters([
            'sources',
            'unHiddenArticles',
            'feedMenuState',
            'selectedSources',
            'unReadArticles',
        ]),
    },
    methods: {
        ...mapActions([
            'changeFeedMenuState',
            'updateType',
            'selectSource',
            'updateSearch',
        ]),
        articleCountInSource (source) {
          return this.unReadArticles.filter(article => article.sources.title == source.title).length
        },
        isSelectedSource (source) {
          return this.selectedSources.find(sSource => sSource == source.title)
        },
        updateSearchData () {
          this.updateSearch(this.search)
        },
        changeMenuState (menuState) {
          this.changeFeedMenuState(menuState)
          switch (menuState) {
            case 'All articles':
              this.updateType('all')
              break
            case 'Favourites':
              this.updateType('starred')
              break
            case 'Unread articles':
              this.updateType('unread')
              break
            case 'Saved articles':
              this.updateType('saved')
              break
            default:
              this.updateType('all')
          }
        }
    }
}
</script>