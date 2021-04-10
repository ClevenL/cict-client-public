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
            <li class="relative px-6 py-1">
              <span
                class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
                v-if="settingsMenuState == 'General'"
                ></span>
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeSettingsMenuState('General')"
              >
                <svg 
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="ml-4">General</span>
              </a>
            </li>
            <li class="relative px-6 py-1">
              <span
                class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
                v-if="settingsMenuState == 'Sources'"
                ></span>
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeSettingsMenuState('Sources')"
              >
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
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <span class="ml-4">Sources</span>
              </a>
            </li>
            <li class="relative px-6 py-1">
              <span
                class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
                v-if="settingsMenuState == 'Tags'"
                ></span>
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeSettingsMenuState('Tags')"
              >
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
                  <path
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                <span class="ml-4">Tags</span>
              </a>
            </li>
            <li class="relative px-6 py-1">
              <span
                class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
                v-if="settingsMenuState == 'Categories'"
                ></span>
              <a
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click="changeSettingsMenuState('Categories')"
              >
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
                <span class="ml-4">Categories</span>
              </a>
            </li>
          </ul>
        </div>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "SidebarSettings",
    computed: {
        ...mapGetters([
            'settingsMenuState',
        ]),
    },
    methods: {
        ...mapActions([
            'changeSettingsMenuState',
        ])
    }
}
</script>