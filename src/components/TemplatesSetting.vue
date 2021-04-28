<template> 
    <div class="flex mb-3 pt-0">
    <input v-model="newCategoryTitle" type="text" placeholder="Add a new category" class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white text-xl border rounded-l-md border-gray-100 outline-none focus:outline-none focus: w-full"/>
    <button @click="addCategory" class="px-8 rounded-r-md bg-gray-200 transition-colors duration-150 text-gray-500 hover:text-gray-800 hover:bg-green-200 font-semibold p-4">Add</button>
    </div>
    <draggable 
    v-model="sortableCategories" 
    @start="drag=true" 
    @end="drag=false; saveSortedCategories()" 
    item-key="_id">
    <template #item="{element}">
        
        <div class="text-gray-600 font-semibold border border-gray-100 list-none rounded-sm px-3 py-3">
        <div class="inline-flex items-center justify-between relative w-full">
            <div class="inline-flex items-center">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <div class="ml-6">{{element.title}}</div>
            </div>
            <div @click="removeCategory(element)" class="justify-end transition-colors text-gray-500 duration-150 hover:text-red-500 flex">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </div>
        </div>
        </div>
    </template>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Settings",
  components: {
    draggable,
  },
  data() {
    return {
      addSourceTest: "",
      newCategoryTitle: "",
      sortableCategories: [],
    };
  },
  async mounted() {
    this.sortableCategories = this.categories
  },
  computed: {
    ...mapGetters([
      'categories',
      'template',
    ]),
  },
  methods: {
    ...mapActions([
      'updateTemplate',
      'updateTemplateCategories',
    ]),
    removeCategory(element) {
      const index = this.sortableCategories.findIndex(item => item.title == element.title)
      this.sortableCategories.splice(index, 1)
      let data = this.template
      data.categories = this.sortableCategories
      this.updateTemplateCategories(data)
    },
    addCategory() {
      this.sortableCategories.push({
        title: this.newCategoryTitle,
        arrayName: this.toCamelCase(this.newCategoryTitle),
        })
      let data = this.template
      data.categories = this.sortableCategories
      this.updateTemplateCategories(data)
      this.newCategoryTitle = ""
    },
    toCamelCase(input) {							      
      let regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g
      const inputArray = input.match(regex)
      let result = ""
      for(let i = 0 , len = inputArray.length; i < len; i++) {
        let currentStr = inputArray[i]
        let tempStr = currentStr.toLowerCase()
        if(i != 0) {
            tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1)
        }
        result +=tempStr
      }
      return result
    },
    saveSortedCategories() {
      let data = this.template
      data.categories = this.sortableCategories
      this.updateTemplateCategories(data)
    },
  },
};
</script>
