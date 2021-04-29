<template> 
    <div class="flex mb-3 pt-0">
      <input v-model="newSourceURL" type="text" placeholder="RSS feed URL" class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white text-xl border rounded-l-md border-gray-100 outline-none focus:outline-none focus: w-full"/>
      <button @click="addSourceData" class="px-8 rounded-r-md bg-gray-200 transition-colors duration-150 text-gray-500 hover:text-gray-800 hover:bg-green-200 font-semibold p-4">Add</button>
    </div>
    <div v-if="sourceAddingError.length">{{ sourceAddingError }}</div>
    <div class="container flex flex-col mx-auto w-full items-center justify-center">
      <ul class="flex flex-col w-full">
        <li 
        v-for="source in sources" :key="source._id"
        class="border-gray-400 flex flex-col mb-2">
          <div 
          @click="selectSource(source)"
          class="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
            <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
              <a href="#" class="block relative">
                <img alt="profil" :src="getSourceFaviconURL(source.rss_url)" class="mx-auto object-cover rounded-full h-5 w-5 "/>
              </a>
            </div>
            <div class="flex-1 pl-1 md:mr-16">
              <div v-if="isSelected(source)" class="flex">
                <input class="font-medium" placeholder="Source Title" v-model="editedTitle" />
              </div>
              <div 
              v-else
              class="font-medium">
                {{ source.title }}
              </div>
              <div class="text-gray-600 text-sm">
                {{ source.rss_url }}
              </div>
            </div>
            <div class="text-gray-600 text-xs">
              {{ source.last_query }}
            </div>
            <div class="w-24 text-right flex justify-end">
              <svg width="12" height="12" class="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div v-if="isSelected(source)">
            <div class="flex justify-start">
              <div 
              @click="deleteSource(source)"
              class="flex cursor-pointer border rounded-md shadow">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                <div class="text-gray-600">Delete Source</div>
              </div>
              <div 
              @click="updateSourceData(source)"
              class="flex cursor-pointer border rounded-md shadow">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <div class="text-gray-600">Save changes</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Settings",
  data() {
    return {
      newSourceURL: "",
      editedTitle: "",
      selected: {},
    };
  },
  computed: {
    ...mapGetters([
      'sources',
      'sourceAddingError',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSourceAddingError',
      'addSource',
      'updateSource',
      'deleteSource',
    ]),
    selectSource (source) {
      this.selected = source
      this.editedTitle = source.title
    },
    isSelected (source) {
      return source === this.selected
    },
    unSelectSource (source) {
      this.editedTitle = ""
      this.selected = {}
    },
    addSourceData () {
      this.addSource(this.newSourceURL)
      this.newSourceURL = ""
    },
    updateSourceData (source) {
      source.title = this.editedTitle
      this.updateSource(source)
      this.unSelectSource()
    },
    getSourceFaviconURL (url){
      return `https://www.google.com/s2/favicons?domain=${url}`
    },
  },
};
</script>
