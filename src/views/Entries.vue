<template>
  <sidebar-entries></sidebar-entries>
  <div class="flex flex-col flex-1">
    <header-nav></header-nav>
    <main class="h-full overflow-y-auto">
      <!-- Content goes here -->
      <div class="max-w-3xl px-8 py-4 my-20 shadow-md mx-auto bg-white">
        <div id="toolbar"></div>
        <div id="quill"></div>        
      </div>
    </main>
  </div>
</template>

<script>
import SidebarEntries from "../components/SidebarEntries.vue"
import HeaderNav from "../components/HeaderNav.vue"
import Quill from "quill"
import "quill/dist/quill.bubble.css"
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Entries",
  components: {
    "sidebar-entries": SidebarEntries,
    "header-nav": HeaderNav,
  },
  data() {
    return {
      title: "",
      editedTitle: "",
      articleURLs: [],
      editedDescription: "",
      editedArticleURLs: [],
      selected: {},
    }
  },
 async mounted() {
    let quill = new Quill('#quill', {theme: 'bubble'})
    quill.setContents([
      { insert: `${this.activeCollection.title}\n`, attributes: { header: 1 } },
    ])
  },
  computed: {
    ...mapGetters([
      'activeCollection',
      'entriesInCollection',
      'entriesInCollectionCategorized',
      'categories'
    ]),
  },
  methods: {
    ...mapActions([
      'addEntry',
      'deleteEntry',
      'updateEntry',
    ]),
    addNewEntry() {
      this.addEntry({
        title: this.title,
        collection_id: this.activeCollection._id
      })
      this.title = ""
    },
    select(item) {
      this.selected = item
      this.editedTitle = item.title
      this.editedDescription = item.description
      this.editedArticleURLs = item.article_urls
    },
    isSelected(item) {
      return item._id === this.selected._id
    },
    unselect() {
      this.selected = {}
      this.editedTitle = ""
      this.editedDescription = ""
      this.editedArticleURLs = []
    },
    addURL() {
      this.editedArticleURLs.push([])
    },
    deleteURL(i) {
      this.editedArticleURLs.splice(i, 1)
    },
    updateEntryData(item) {
      item.title = this.editedTitle
      item.description = this.editedDescription
      item.article_urls = this.editedArticleURLs
      this.updateEntry(item)
      this.unselect()
    },
    updateCategory(item, category) {
      item.category = category.title
      this.updateEntry(item)
      this.unselect()
    },
  },
}
</script>
