<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <router-view v-if="allDataLoaded" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  async created() {
    this.loadAllData()
    /*
    setInterval(() => {
      this.loadAllData()
      console.log("automatic fetch and data load")
    }, 300000);
    */
  },
  computed: {
    ...mapGetters(['allDataLoaded']),
  },
  methods: {
    ...mapActions(['updateAllDataLoaded', 'loadAllData']),
  },
}
</script>
