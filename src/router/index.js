import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../views/Feed.vue'
import Entries from '../views/Entries.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/entries',
    name: 'Entries',
    component: Entries
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
