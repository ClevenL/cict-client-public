<template>
    <aside
        class="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white md:block"
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
              <p class="inline-flex items-center w-full text-sm font-semibold text-gray-400">Collections</p>
            </li>
            <li class="flex relative px-6 py-1"
                v-for="collection in collections" :key="collection._id"
            >
              <a @click="makeCollectionActive(collection)">
                <span
                  class="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                  v-if="isActive(collection)"
                ></span>
              <div class="w-full text-sm font-semibold text-gray-500 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                  {{ collection.title }}
              </div>
              </a>
            </li>
          </ul>
        </div>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "SidebarEntries",
    computed: {
        ...mapGetters([
            'collections',
            'activeCollection',
        ]),
    },
    methods: {
        ...mapActions([
            'makeActive',
            'makeInActive',
        ]),
        isActive(item) {
          return item == this.activeCollection;
        },
        makeCollectionActive(item) {
          this.makeInActive(this.activeCollection)
          this.makeActive(item)
        },
    }
}
</script>