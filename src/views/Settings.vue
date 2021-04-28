<template>
  <sidebar-settings></sidebar-settings>
  <div class="flex flex-col flex-1">
    <header-nav></header-nav>
    <main class="h-full overflow-y-auto">
      <!-- Content goes here -->
      <div class="max-w-5xl px-8 py-4 my-10 shadow-md mx-auto bg-white">
        <sources-setting v-if="settingsMenuState == 'Sources'" />  
        <templates-setting v-if="settingsMenuState == 'Categories'" />  
      </div>
    </main>
  </div>
</template>

<script>
import SidebarSettings from "../components/SidebarSettings.vue"
import TemplatesSetting from "../components/TemplatesSetting.vue"
import SourcesSetting from "../components/SourcesSetting.vue"
import HeaderNav from "../components/HeaderNav.vue"
import { mapGetters } from 'vuex'

export default {
  name: "Settings",
  components: {
    "sidebar-settings": SidebarSettings,
    "templates-setting": TemplatesSetting,
    "sources-setting": SourcesSetting,
    "header-nav": HeaderNav,
  },
  computed: {
    ...mapGetters([
      'settingsMenuState',
    ]),
  },
};
</script>
