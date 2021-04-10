<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <router-view />
  </div>
</template>

<script>
export default {
  async created() {
    this.$store.dispatch('loadArticles')
    this.$store.dispatch('loadCollections')
    this.$store.dispatch('loadEntries')
    this.$store.dispatch('loadTemplates')
    this.$store.dispatch('loadSources')
  }
};
</script>